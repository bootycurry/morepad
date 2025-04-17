"use client";

import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { io, Socket } from "socket.io-client";

const TextEditor = ({ documentId }: { documentId: string }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);
  const [saveStatus, setSaveStatus] = useState<"Saved" | "Saving..." | "Error">("Saved");

  useEffect(() => {
    const s = io("http://localhost:5173");
    setSocket(s);
    
    return () => {
      s.disconnect();
    }
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return
    
    socket.emit('get-document', documentId)
    
    socket.once('load-document', (document) => {
      quill.setContents(document)
      quill.enable(true)
    })
    
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
  }, [socket, quill]);

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

  const wrapperRef = useRef<HTMLDivElement>(null);

  const toolbar_options = [
    [{ 'font': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']
  ];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      const editor = document.createElement("div");
      wrapper.innerHTML = "";
      wrapper.append(editor);
      const q = new Quill(editor, {
        theme: "snow",
        modules: {
          toolbar: toolbar_options,
        },
      });
      q.disable();
      q.setText("Loading...");
      setQuill(q);
    }

    return () => {
      if (wrapper) {
        wrapper.innerHTML = "";
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Define styles for the save status indicator
  const saveStatusStyle = {
    position: 'fixed' as const,
    bottom: '10px',
    right: '10px',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: saveStatus === 'Saved' ? '#e3f2fd' : 
                    saveStatus === 'Saving...' ? '#fff9c4' : '#ffcdd2',
    color: saveStatus === 'Saved' ? '#0d47a1' : 
          saveStatus === 'Saving...' ? '#f57f17' : '#b71c1c',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s'
  };

  return (
    <>
      <div className="container" ref={wrapperRef}></div>
      <div style={saveStatusStyle}>
        {saveStatus}
      </div>
    </>
  );
};

export default TextEditor;