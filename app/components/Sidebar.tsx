"use client"

interface Document {
  id: string;
  title: string;
  isActive: boolean;
}

interface SidebarProps {
  documents: Document[];
  sharedDocuments: Document[];
  onDocumentSelect: (id: string) => void;
}

export default function Sidebar({ documents, sharedDocuments, onDocumentSelect }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto flex flex-col gap-4">
      <div>
        <div className="sidebar-header font-semibold text-xs text-gray-500 uppercase tracking-wider px-2">
          MY DOCUMENTS
        </div>
        <ul className="document-list mt-2 flex flex-col gap-1">
          {documents.map((doc) => (
            <li 
              key={doc.id}
              className={`p-2 rounded cursor-pointer flex items-center gap-2 text-sm ${
                doc.isActive ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'
              }`}
              onClick={() => onDocumentSelect(doc.id)}
            >
              <span className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </span>
              {doc.title}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="sidebar-header font-semibold text-xs text-gray-500 uppercase tracking-wider px-2">
          SHARED WITH ME
        </div>
        <ul className="document-list mt-2 flex flex-col gap-1">
          {sharedDocuments.map((doc) => (
            <li 
              key={doc.id}
              className={`p-2 rounded cursor-pointer flex items-center gap-2 text-sm ${
                doc.isActive ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'
              }`}
              onClick={() => onDocumentSelect(doc.id)}
            >
              <span className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </span>
              {doc.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-4">
        <button className="flex items-center gap-2 text-sm w-full p-2 rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          New Document
        </button>
      </div>
    </aside>
  );
}