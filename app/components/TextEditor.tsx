"use client"

import { useEffect, useRef, useState } from "react"
import "quill/dist/quill.snow.css"
import Quill from "quill"
import { io, type Socket } from "socket.io-client"
import { motion } from "framer-motion"
import { Check, Copy, AlertTriangle, Clock, Share2, ArrowLeft, Users } from "lucide-react"
import Link from "next/link"

const TextEditor = ({ documentId }: { documentId: string }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [quill, setQuill] = useState<Quill | null>(null)
  const [saveStatus, setSaveStatus] = useState<"Saved" | "Saving..." | "Error">("Saved")
  const [copyStatus, setCopyStatus] = useState<"Copy" | "Copied!">("Copy")
  const [activeUsers, setActiveUsers] = useState<number>(1)

  useEffect(() => {
    const s = io("http://localhost:5173")
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket == null || quill == null) return

    socket.emit("get-document", documentId)

    socket.once("load-document", (document) => {
      quill.setContents(document)
      quill.enable(true)
    })

    // Listen for active users updates
    socket.on("active-users-update", (count) => {
      setActiveUsers(count)
    })

    return () => {
      socket.off("active-users-update")
    }
  }, [socket, quill, documentId])

  // Add auto-save functionality
  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      setSaveStatus("Saving...")
      socket.emit("save-document", quill.getContents())

      // Set a timeout to update the save status after a brief delay
      setTimeout(() => {
        setSaveStatus("Saved")
      }, 1000)
    }, 5000) // Save every 5 seconds

    // Handle save confirmation or error from server
    socket.on("save-document-success", () => {
      setSaveStatus("Saved")
    })

    socket.on("save-document-error", () => {
      setSaveStatus("Error")
    })

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill, documentId])

  useEffect(() => {
    if (socket == null || quill == null) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (delta: any, oldDelta: any, source: any) => {
      if (source !== "user") return
      socket.emit("send-changes", delta)
      // Set status to unsaved when user makes changes
      setSaveStatus("Saving...")
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (delta: any) => {
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])

  const wrapperRef = useRef<HTMLDivElement>(null)

  const toolbar_options = [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ]

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (wrapper) {
      const editor = document.createElement("div")
      wrapper.innerHTML = ""
      wrapper.append(editor)
      const q = new Quill(editor, {
        theme: "snow",
        modules: {
          toolbar: toolbar_options,
        },
      })
      q.disable()
      q.setText("Loading...")
      setQuill(q)
    }

    return () => {
      if (wrapper) {
        wrapper.innerHTML = ""
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(documentId).then(() => {
      setCopyStatus("Copied!")
      setTimeout(() => setCopyStatus("Copy"), 2000)
    })
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center text-purple-600 hover:text-purple-700 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">MorePad</h1>
        </div>

        <div className="flex items-center space-x-3">
          <motion.div
            className="flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Users className="w-4 h-4 mr-1 text-purple-500" />
            <span>{activeUsers} active</span>
          </motion.div>

          <motion.button
            className="flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm hover:bg-purple-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => copyToClipboard()}
          >
            {copyStatus === "Copy" ? (
              <>
                <Share2 className="w-4 h-4 mr-1" />
                <span>Share</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-1" />
                <span>Copied!</span>
              </>
            )}
          </motion.button>

          <motion.div
            className={`px-3 py-1 rounded-full text-sm flex items-center ${
              saveStatus === "Saved"
                ? "bg-green-100 text-green-700"
                : saveStatus === "Saving..."
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
            animate={{
              scale: saveStatus === "Saving..." ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: saveStatus === "Saving..." ? Number.POSITIVE_INFINITY : 0,
            }}
          >
            {saveStatus === "Saved" && <Check className="w-4 h-4 mr-1" />}
            {saveStatus === "Saving..." && <Clock className="w-4 h-4 mr-1" />}
            {saveStatus === "Error" && <AlertTriangle className="w-4 h-4 mr-1" />}
            {saveStatus}
          </motion.div>
        </div>
      </header>

      {/* Document ID Bar */}
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Document ID:</span>
          <code className="bg-white px-2 py-1 rounded text-sm font-mono text-gray-700 border border-gray-300">
            {documentId}
          </code>
          <button
            onClick={copyToClipboard}
            className="ml-2 p-1 rounded-md hover:bg-gray-200 transition-colors"
            title="Copy document ID"
          >
            {copyStatus === "Copy" ? (
              <Copy className="w-4 h-4 text-gray-500" />
            ) : (
              <Check className="w-4 h-4 text-green-500" />
            )}
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="flex-grow overflow-auto">
        <div
          className="container mx-auto px-4 py-6 bg-white shadow-sm rounded-lg my-4 min-h-[calc(100vh-200px)]"
          ref={wrapperRef}
        ></div>
      </div>
    </div>
  )
}

export default TextEditor