"use client";

import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

const TextEditor = () => {
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
      new Quill(editor, {
        theme: "snow",
        modules: {
          toolbar: toolbar_options,
        },
      });
    }

    return () => {
      if (wrapper) {
        wrapper.innerHTML = "";
      }
    };
  }, [toolbar_options]);

  return (
    <>
      <div className="container" ref={wrapperRef}></div>
    </>
  );
};

export default TextEditor;
