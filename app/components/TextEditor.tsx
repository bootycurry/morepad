"use client";

import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { io, Socket } from "socket.io-client";

const TextEditor = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socket, setSocket] = useState<Socket | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [quill, setQuill] = useState<Quill | null>(null);


  useEffect(() => {
    const s = io("http://localhost:5173");
    setSocket(s);
  
    
    return () => {
      s.disconnect();
    }
  }
  , []);

  useEffect(() => {
    if (socket == null || quill == null) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (delta: any, oldDelta: any, source: any) => {
      if (source !== "user") return
      socket.emit("send-changes", delta)
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

    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
  
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    
  
    ['clean']                                         // remove formatting button
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
      setQuill(q);
    }

    return () => {
      if (wrapper) {
        wrapper.innerHTML = "";
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container" ref={wrapperRef}></div>
    </>
  );
};

export default TextEditor;
