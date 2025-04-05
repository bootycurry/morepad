"use client"
import { useState, useRef, useEffect } from "react";
import Toolbar from "./Toolbar";

interface EditorProps {
  initialContent: string;
  title: string;
  onSave?: (content: string) => void;
  isFullscreen: boolean;
  setIsFullscreen: (isFullscreen: boolean) => void;
}

export default function Editor({ 
  initialContent, 
  title, 
  onSave, 
  isFullscreen, 
  setIsFullscreen 
}: EditorProps) {
  const [content, setContent] = useState(initialContent);
  const [documentTitle, setDocumentTitle] = useState(title);
  // const [fontSize, setFontSize] = useState("16px");
  // const [alignment, setAlignment] = useState("left");
  const editorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Save on Ctrl+S
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
      
      // Toggle fullscreen on F11
      if (e.key === "F11") {
        e.preventDefault();
        setIsFullscreen(!isFullscreen);
      }

      // Bold on Ctrl+B
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        document.execCommand("bold", false);
      }

      // Italic on Ctrl+I
      if (e.ctrlKey && e.key === "i") {
        e.preventDefault();
        document.execCommand("italic", false);
      }

      // Underline on Ctrl+U
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        document.execCommand("underline", false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [content, isFullscreen, onSave]);

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleTitleChange = () => {
    if (titleRef.current) {
      setDocumentTitle(titleRef.current.innerText);
    }
  };

  const handleBold = () => document.execCommand("bold", false);
  const handleItalic = () => document.execCommand("italic", false);
  const handleUnderline = () => document.execCommand("underline", false);
  const handleHeading1 = () => document.execCommand("formatBlock", false, "<h1>");
  const handleHeading2 = () => document.execCommand("formatBlock", false, "<h2>");
  const handleHeading3 = () => document.execCommand("formatBlock", false, "<h3>");
  const handleBulletList = () => document.execCommand("insertUnorderedList", false);
  const handleNumberedList = () => document.execCommand("insertOrderedList", false);
  const handleLink = () => {
    const url = prompt("Enter link URL:", "https://");
    if (url) document.execCommand("createLink", false, url);
  };
  const handleImage = () => {
    const url = prompt("Enter image URL:", "https://");
    if (url) document.execCommand("insertImage", false, url);
  };
  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      setContent("");
    }
  };
  const handleSave = () => {
    if (onSave) onSave(content);
  };
  const handleShare = () => {
    alert("Sharing functionality would be implemented here");
  };
  // const handleFontSizeChange = (size: string) => {
  //   setFontSize(size);
  //   if (editorRef.current) {
  //     document.execCommand("fontSize", false, "7");
  //     const selection = window.getSelection();
  //     if (selection && selection.rangeCount > 0) {
  //       const range = selection.getRangeAt(0);
  //       const spans = document.getElementsByTagName("font");
  //       for (let i = 0; i < spans.length; i++) {
  //         if (spans[i].size === "7") {
  //           spans[i].removeAttribute("size");
  //           spans[i].style.fontSize = size;
  //         }
  //       }
  //       selection.removeAllRanges();
  //       selection.addRange(range);
  //     }
  //   }
  // };
  // const handleAlignmentChange = (align: string) => {
  //   setAlignment(align);
  //   if (align === "left") document.execCommand("justifyLeft", false);
  //   if (align === "center") document.execCommand("justifyCenter", false);
  //   if (align === "right") document.execCommand("justifyRight", false);
  // };

  return (
    <div className="flex flex-col flex-1">
      <Toolbar 
        onBold={handleBold}
        onItalic={handleItalic}
        onUnderline={handleUnderline}
        onHeading1={handleHeading1}
        onHeading2={handleHeading2}
        onHeading3={handleHeading3}
        onBulletList={handleBulletList}
        onNumberedList={handleNumberedList}
        onLink={handleLink}
        onImage={handleImage}
        onClear={handleClear}
        onSave={handleSave}
        onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
        isFullscreen={isFullscreen}
        onShare={handleShare}
      />
      
      <div className="editor flex-1 p-8 overflow-y-auto">
        <div className="editor-content max-w-3xl mx-auto">
          <div 
            ref={titleRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleTitleChange}
            className="editor-title text-3xl font-bold mb-4 outline-none"
            dangerouslySetInnerHTML={{ __html: documentTitle }}
          />
          
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleContentChange}
            className="editor-body min-h-[300px] outline-none leading-relaxed"
            // style={{ 
            //   fontSize, 
            //   textAlign: alignment as "left" | "center" | "right" 
            // }}
            dangerouslySetInnerHTML={{ __html: initialContent }}
          />
        </div>
      </div>
    </div>
  );
}