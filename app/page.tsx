"use client"

import { useState } from "react";
import AppHeader from "./components/AppHeader";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import StatusBar from "./components/StatusBar";

export default function Home() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState({
    id: "1",
    title: "Project Proposal: Real-Time Collaborative Text Editor",
    content: "<p>This document outlines our proposal for developing a real-time collaborative text editing platform that will allow multiple users to work on documents simultaneously.</p><h2>Project Overview</h2><p>The goal of this project is to create a seamless collaborative editing experience that rivals existing solutions while adding innovative features that address common pain points in collaborative writing.</p>"
  });
  
  const [documents, setDocuments] = useState([
    { id: "1", title: "Project Proposal", isActive: true },
    { id: "2", title: "Meeting Notes", isActive: false },
    { id: "3", title: "Research Analysis", isActive: false }
  ]);
  
  const [sharedDocuments, setSharedDocuments] = useState([
    { id: "4", title: "Team Roadmap", isActive: false },
    { id: "5", title: "Product Specs", isActive: false }
  ]);

  const handleSave = (content: string) => {
    console.log("Saving content:", content);
    // Implement save logic here
  };

  const handleDocumentSelect = (id: string) => {
    // Update active document
    const updatedDocs = documents.map(doc => ({
      ...doc,
      isActive: doc.id === id
    }));
    setDocuments(updatedDocs);
    
    // Update shared docs (deactivate all)
    const updatedShared = sharedDocuments.map(doc => ({
      ...doc,
      isActive: doc.id === id
    }));
    setSharedDocuments(updatedShared);
    
    // Find the selected document and set it as current
    const selected = [...documents, ...sharedDocuments].find(doc => doc.id === id);
    if (selected) {
      setCurrentDocument({
        ...currentDocument,
        id: selected.id,
        title: selected.title
      });
    }
  };

  return (
    <div className="app-container flex flex-col h-screen w-screen">
      <AppHeader />
      
      <div className="main-content flex flex-1 overflow-hidden">
        {!isFullscreen && (
          <Sidebar 
            documents={documents} 
            sharedDocuments={sharedDocuments}
            onDocumentSelect={handleDocumentSelect}
          />
        )}
        
        <div className="editor-container flex flex-col flex-1">
          <Editor 
            initialContent={currentDocument.content}
            title={currentDocument.title}
            onSave={handleSave}
            isFullscreen={isFullscreen}
            setIsFullscreen={setIsFullscreen}
          />
          
          <StatusBar />
        </div>
      </div>
    </div>
  );
}