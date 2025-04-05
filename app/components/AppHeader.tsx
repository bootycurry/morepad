"use client"

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white shadow-sm">
      <div className="logo flex items-center gap-2 font-semibold text-xl text-indigo-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path>
        </svg>
        Morepad
      </div>
      <div className="user-menu">
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Bob
        </button>
      </div>
    </header>
  );
}