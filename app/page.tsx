"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { motion } from "framer-motion"
import { Plus, FileText, Sparkles, ChevronRight } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [documentId, setDocumentId] = useState("")
  const [error, setError] = useState("")

  const createNewDocument = () => {
    const id = uuidv4()
    router.push(`/documents/${id}`)
  }

  const openDocument = () => {
    if (!documentId.trim()) {
      setError("Please enter a document ID")
      return
    }
    router.push(`/documents/${documentId}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 p-4 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full bg-pink-200/30 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-orange-200/30 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="max-w-md w-full p-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] overflow-hidden relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative elements */}
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-purple-300/30 blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-orange-300/30 blur-xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        />

        <motion.div
          className="flex flex-col items-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-2 mb-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-purple-600">MorePad</h1>
          </motion.div>
          <motion.div
            className="h-1 w-32 bg-pink-500 rounded mb-6"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.p
            className="text-gray-600 text-center text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Collaborative document editing, simplified
          </motion.p>
        </motion.div>

        <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <motion.button
            onClick={createNewDocument}
            className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center font-medium group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div className="flex items-center gap-2" whileHover={{ gap: 4 }}>
              <Plus className="w-5 h-5" />
              <span>Create New Document</span>
            </motion.div>
          </motion.button>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm text-gray-500 mb-2 font-medium flex items-center gap-1">
              <FileText className="w-4 h-4" />
              Or open an existing document
            </p>
            <div className="flex items-center overflow-hidden border-2 border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-pink-400 focus-within:border-transparent transition-all duration-300">
              <input
                type="text"
                value={documentId}
                onChange={(e) => {
                  setDocumentId(e.target.value)
                  setError("")
                }}
                placeholder="Enter document ID"
                className="w-full px-4 py-3 outline-none text-gray-700 bg-gray-50/50 backdrop-blur-sm"
              />
              <motion.button
                onClick={openDocument}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium flex items-center gap-1 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Open</span>
                <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <ChevronRight className="w-4 h-4 group-hover:text-pink-600 transition-colors" />
                </motion.div>
              </motion.button>
            </div>
            {error && (
              <motion.p
                className="text-red-500 text-sm mt-2 flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 pt-6 border-t border-gray-100 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
            </motion.span>
            Securely edit documents with anyone, anywhere.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
