import { useRef, useEffect, useState } from 'react'

export default function Canvas({
  width,
  height,
  dpi,
  elements,
  selectedId,
  onSelectElement,
  onUpdateElement,
}) {
  const canvasRef = useRef(null)
  const [dragging, setDragging] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const widthPx = width * dpi
  const heightPx = height * dpi

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedId === null) return
      
      const element = elements.find(el => el.id === selectedId)
      if (!element) return

      const step = e.shiftKey ? 10 : 1
      let updates = null

      switch (e.key) {
        case 'ArrowLeft':
          updates = { x: Math.max(0, element.x - step) }
          break
        case 'ArrowRight':
          updates = { x: Math.min(widthPx - element.width, element.x + step) }
          break
        case 'ArrowUp':
          updates = { y: Math.max(0, element.y - step) }
          break
        case 'ArrowDown':
          updates = { y: Math.min(heightPx - element.height, element.y + step) }
          break
        case 'Delete':
        case 'Backspace':
          onSelectElement(null)
          onUpdateElement(selectedId, null) // Signal deletion
          e.preventDefault()
          return
        default:
          return
      }

      if (updates) {
        e.preventDefault()
        onUpdateElement(selectedId, updates)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedId, elements, widthPx, heightPx, onUpdateElement, onSelectElement])

  const handlePointerDown = (e, elementId) => {
    e.stopPropagation()
    const element = elements.find(el => el.id === elementId)
    if (!element) return

    onSelectElement(elementId)
    setDragging(elementId)

    const rect = canvasRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    setDragOffset({
      x: clickX - element.x,
      y: clickY - element.y,
    })

    e.target.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (dragging === null) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - dragOffset.x
    const y = e.clientY - rect.top - dragOffset.y

    const element = elements.find(el => el.id === dragging)
    if (!element) return

    // Constrain to canvas bounds
    const constrainedX = Math.max(0, Math.min(widthPx - element.width, x))
    const constrainedY = Math.max(0, Math.min(heightPx - element.height, y))

    onUpdateElement(dragging, { x: constrainedX, y: constrainedY })
  }

  const handlePointerUp = () => {
    setDragging(null)
  }

  const handleCanvasClick = (e) => {
    if (e.target === canvasRef.current) {
      onSelectElement(null)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-sm text-gray-600">
        Canvas: {width}" × {height}" @ {dpi} DPI ({widthPx} × {heightPx} px)
      </div>
      <div
        ref={canvasRef}
        className="relative bg-white border-2 border-gray-400 shadow-lg"
        style={{
          width: `${widthPx}px`,
          height: `${heightPx}px`,
          cursor: dragging ? 'grabbing' : 'default',
        }}
        onClick={handleCanvasClick}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {elements.map((element) => (
          <Element
            key={element.id}
            element={element}
            isSelected={element.id === selectedId}
            onPointerDown={(e) => handlePointerDown(e, element.id)}
          />
        ))}
      </div>
    </div>
  )
}

function Element({ element, isSelected, onPointerDown }) {
  const style = {
    position: 'absolute',
    left: `${element.x}px`,
    top: `${element.y}px`,
    width: `${element.width}px`,
    height: `${element.height}px`,
    transform: `rotate(${element.rotation}deg)`,
    cursor: 'grab',
    userSelect: 'none',
  }

  if (element.type === 'text') {
    return (
      <div
        style={style}
        className={`flex items-center justify-center border ${
          isSelected ? 'border-2 border-blue-500 bg-blue-50' : 'border-gray-300 bg-transparent'
        }`}
        onPointerDown={onPointerDown}
      >
        <span
          style={{ fontSize: `${element.props.fontSize}px` }}
          className="font-sans select-none"
        >
          {element.props.text}
        </span>
      </div>
    )
  }

  if (element.type === 'rectangle') {
    return (
      <div
        style={style}
        className={`border-2 ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-black bg-transparent'
        }`}
        onPointerDown={onPointerDown}
      />
    )
  }

  if (element.type === 'barcode') {
    return (
      <div
        style={style}
        className={`flex items-center justify-center border ${
          isSelected ? 'border-2 border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'
        }`}
        onPointerDown={onPointerDown}
      >
        <div className="text-center">
          <div className="font-mono text-xs mb-1">{element.props.barcodeType}</div>
          <svg
            width={element.width - 10}
            height={element.height - 30}
            className="mx-auto"
          >
            {/* Simple barcode representation with vertical lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <rect
                key={i}
                x={i * ((element.width - 10) / 20)}
                y={0}
                width={(element.width - 10) / 40}
                height={element.height - 30}
                fill={i % 3 === 0 ? 'black' : i % 2 === 0 ? 'black' : 'transparent'}
              />
            ))}
          </svg>
          <div className="font-mono text-xs mt-1">{element.props.text}</div>
        </div>
      </div>
    )
  }

  return null
}
