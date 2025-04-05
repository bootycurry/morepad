"use client"

export default function StatusBar() {
  return (
    <div className="status-bar flex items-center justify-between p-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
      <div className="collaborators flex items-center">
        <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium text-xs -mr-2 border-2 border-white" title="Alex Morgan">
          AM
        </div>
        <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-medium text-xs -mr-2 border-2 border-white" title="Taylor Kim">
          TK
        </div>
        <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-medium text-xs border-2 border-white" title="Jordan Smith">
          JS
        </div>
      </div>
      
      <div className="saving-status flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        All changes saved
      </div>
    </div>
  );
}