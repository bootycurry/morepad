"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();
  const [documentId, setDocumentId] = useState("");
  const [error, setError] = useState("");

  const createNewDocument = () => {
    const id = uuidv4();
    router.push(`/documents/${id}`);
  };

  const openDocument = () => {
    if (!documentId.trim()) {
      setError("Please enter a document ID");
      return;
    }
    router.push(`/documents/${documentId}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">MorePad</h1>
        <p className="text-gray-600 text-center mb-8">
          Collaborative document editing made simple
        </p>
        
        <div className="space-y-6">
          <button
            onClick={createNewDocument}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Create New Document
          </button>

          <div className="relative">
            <div className="flex items-center border-b border-gray-300 py-2">
              <input
                type="text"
                value={documentId}
                onChange={(e) => {
                  setDocumentId(e.target.value);
                  setError("");
                }}
                placeholder="Enter document ID"
                className="w-full px-2 py-1 outline-none text-gray-700"
              />
              <button
                onClick={openDocument}
                className="ml-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition-colors"
              >
                Open
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>
              Don&apos;t have a document ID? Create a new document to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}