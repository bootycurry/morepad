"use client"

interface ToolbarProps {
  onBold?: () => void;
  onItalic?: () => void;
  onUnderline?: () => void;
  onHeading1?: () => void;
  onHeading2?: () => void;
  onHeading3?: () => void;
  onBulletList?: () => void;
  onNumberedList?: () => void;
  onLink?: () => void;
  onImage?: () => void;
  onClear?: () => void;
  onSave?: () => void;
  onFullscreenToggle?: () => void;
  isFullscreen?: boolean;
  onShare?: () => void;
}

export default function Toolbar({
  onBold,
  onItalic,
  onUnderline,
  onHeading1,
  onHeading2,
  onHeading3,
  onBulletList,
  onNumberedList,
  onLink,
  onImage,
  onClear,
  onSave,
  onFullscreenToggle,
  isFullscreen,
  onShare
}: ToolbarProps) {
  return (
    <div className="toolbar flex items-center p-2 bg-gray-50 border-b border-gray-200 gap-2 flex-wrap">
      <div className="toolbar-group flex items-center gap-1 px-2 border-r border-gray-200">
        <button 
          onClick={onBold} 
          className="p-2 rounded hover:bg-gray-100"
          title="Bold (Ctrl+B)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
          </svg>
        </button>
        <button 
          onClick={onItalic} 
          className="p-2 rounded hover:bg-gray-100"
          title="Italic (Ctrl+I)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="4" x2="10" y2="4"></line>
            <line x1="14" y1="20" x2="5" y2="20"></line>
            <line x1="15" y1="4" x2="9" y2="20"></line>
          </svg>
        </button>
        <button 
          onClick={onUnderline} 
          className="p-2 rounded hover:bg-gray-100"
          title="Underline (Ctrl+U)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
            <line x1="4" y1="21" x2="20" y2="21"></line>
          </svg>
        </button>
      </div>
      
      <div className="toolbar-group flex items-center gap-1 px-2 border-r border-gray-200">
        <button 
          onClick={onHeading1} 
          className="px-3 py-1 rounded hover:bg-gray-100"
          title="Heading 1"
        >
          H1
        </button>
        <button 
          onClick={onHeading2} 
          className="px-3 py-1 rounded hover:bg-gray-100"
          title="Heading 2"
        >
          H2
        </button>
        <button 
          onClick={onHeading3} 
          className="px-3 py-1 rounded hover:bg-gray-100"
          title="Heading 3"
        >
          H3
        </button>
      </div>
      
      <div className="toolbar-group flex items-center gap-1 px-2 border-r border-gray-200">
        <button 
          onClick={onBulletList} 
          className="p-2 rounded hover:bg-gray-100"
          title="Bulleted List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </button>
        <button 
          onClick={onNumberedList} 
          className="p-2 rounded hover:bg-gray-100"
          title="Numbered List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="10" y1="6" x2="21" y2="6"></line>
            <line x1="10" y1="12" x2="21" y2="12"></line>
            <line x1="10" y1="18" x2="21" y2="18"></line>
            <path d="M4 6h1v4"></path>
            <path d="M4 10h2"></path>
            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
          </svg>
        </button>
      </div>
      
      <div className="toolbar-group flex items-center gap-1 px-2 border-r border-gray-200">
        <button 
          onClick={onLink} 
          className="p-2 rounded hover:bg-gray-100"
          title="Insert Link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </button>
        <button 
          onClick={onImage} 
          className="p-2 rounded hover:bg-gray-100"
          title="Insert Image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </button>
      </div>
      
      <div className="toolbar-group flex items-center gap-1 px-2">
        <button 
          onClick={onFullscreenToggle}
          className="p-2 rounded hover:bg-gray-100"
          title="Toggle fullscreen (F11)"
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 14 10 14 10 20"></polyline>
              <polyline points="20 10 14 10 14 4"></polyline>
              <line x1="14" y1="10" x2="21" y2="3"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          )}
        </button>
        <button 
          onClick={onShare}
          className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100"
          title="Share document"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          Share
        </button>
      </div>
    </div>
  );
}