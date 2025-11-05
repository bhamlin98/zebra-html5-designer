import { useRef } from 'react'

export default function Toolbar({
  onAddElement,
  onDelete,
  onAlignHorizontal,
  onAlignVertical,
  onExport,
  onImport,
  hasSelection,
}) {
  const fileInputRef = useRef(null)

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Add Elements */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Add Elements</h2>
          <div className="space-y-2">
            <button
              onClick={() => onAddElement('text')}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              + Text
            </button>
            <button
              onClick={() => onAddElement('rectangle')}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              + Rectangle
            </button>
            <button
              onClick={() => onAddElement('barcode')}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              + Barcode
            </button>
          </div>
        </div>

        {/* Element Actions */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Actions</h2>
          <div className="space-y-2">
            <button
              onClick={onDelete}
              disabled={!hasSelection}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Alignment */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Align Horizontal</h2>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onAlignHorizontal('left')}
              disabled={!hasSelection}
              className="px-2 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed text-xs"
              title="Align Left"
            >
              Left
            </button>
            <button
              onClick={() => onAlignHorizontal('center')}
              disabled={!hasSelection}
              className="px-2 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed text-xs"
              title="Align Center"
            >
              Center
            </button>
            <button
              onClick={() => onAlignHorizontal('right')}
              disabled={!hasSelection}
              className="px-2 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed text-xs"
              title="Align Right"
            >
              Right
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Align Vertical</h2>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onAlignVertical('top')}
              disabled={!hasSelection}
              className="px-2 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed text-xs"
              title="Align Top"
            >
              Top
            </button>
            <button
              onClick={() => onAlignVertical('middle')}
              disabled={!hasSelection}
              className="px-2 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed text-xs"
              title="Align Middle"
            >
              Middle
            </button>
            <button
              onClick={() => onAlignVertical('bottom')}
              disabled={!hasSelection}
              className="px-2 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed text-xs"
              title="Align Bottom"
            >
              Bottom
            </button>
          </div>
        </div>

        {/* File Operations */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">File</h2>
          <div className="space-y-2">
            <button
              onClick={onExport}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Export JSON
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Import JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={onImport}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
