import { useState, useEffect } from 'react'
import Toolbar from './components/Toolbar'
import Canvas from './components/Canvas'
import PropertiesPanel from './components/PropertiesPanel'

function App() {
  const [canvasWidth, setCanvasWidth] = useState(4) // inches
  const [canvasHeight, setCanvasHeight] = useState(3) // inches
  const [dpi, setDpi] = useState(96)
  const [elements, setElements] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [nextId, setNextId] = useState(1)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('zebra-designer-state')
    if (saved) {
      try {
        const state = JSON.parse(saved)
        setCanvasWidth(state.canvasWidth || 4)
        setCanvasHeight(state.canvasHeight || 3)
        setDpi(state.dpi || 96)
        setElements(state.elements || [])
        setNextId(state.nextId || 1)
      } catch (e) {
        console.error('Failed to load saved state:', e)
      }
    }
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    const state = {
      canvasWidth,
      canvasHeight,
      dpi,
      elements,
      nextId,
    }
    localStorage.setItem('zebra-designer-state', JSON.stringify(state))
  }, [canvasWidth, canvasHeight, dpi, elements, nextId])

  const addElement = (type) => {
    const newElement = {
      id: nextId,
      type,
      x: 20,
      y: 20,
      width: type === 'text' ? 100 : 80,
      height: type === 'text' ? 30 : 60,
      rotation: 0,
      props: type === 'text' ? { text: 'New Text', fontSize: 16 } : 
             type === 'barcode' ? { text: '123456789', barcodeType: 'Code128' } : {},
    }
    setElements([...elements, newElement])
    setNextId(nextId + 1)
    setSelectedId(newElement.id)
  }

  const updateElement = (id, updates) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el))
  }

  const deleteSelected = () => {
    if (selectedId !== null) {
      setElements(elements.filter(el => el.id !== selectedId))
      setSelectedId(null)
    }
  }

  const alignHorizontal = (mode) => {
    if (selectedId === null) return
    const element = elements.find(el => el.id === selectedId)
    if (!element) return

    const canvasWidthPx = canvasWidth * dpi
    let newX = element.x

    if (mode === 'left') {
      newX = 0
    } else if (mode === 'center') {
      newX = (canvasWidthPx - element.width) / 2
    } else if (mode === 'right') {
      newX = canvasWidthPx - element.width
    }

    updateElement(selectedId, { x: newX })
  }

  const alignVertical = (mode) => {
    if (selectedId === null) return
    const element = elements.find(el => el.id === selectedId)
    if (!element) return

    const canvasHeightPx = canvasHeight * dpi
    let newY = element.y

    if (mode === 'top') {
      newY = 0
    } else if (mode === 'middle') {
      newY = (canvasHeightPx - element.height) / 2
    } else if (mode === 'bottom') {
      newY = canvasHeightPx - element.height
    }

    updateElement(selectedId, { y: newY })
  }

  const exportJSON = () => {
    const data = {
      canvasWidth,
      canvasHeight,
      dpi,
      elements,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'zebra-label.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importJSON = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        setCanvasWidth(data.canvasWidth || 4)
        setCanvasHeight(data.canvasHeight || 3)
        setDpi(data.dpi || 96)
        setElements(data.elements || [])
        setNextId(Math.max(...(data.elements || []).map(el => el.id), 0) + 1)
      } catch (error) {
        alert('Failed to import JSON: ' + error.message)
      }
    }
    reader.readAsText(file)
  }

  const selectedElement = elements.find(el => el.id === selectedId)

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Zebra HTML5 Designer</h1>
        <p className="text-sm opacity-90">Modern React label designer</p>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left toolbar */}
        <Toolbar
          onAddElement={addElement}
          onDelete={deleteSelected}
          onAlignHorizontal={alignHorizontal}
          onAlignVertical={alignVertical}
          onExport={exportJSON}
          onImport={importJSON}
          hasSelection={selectedId !== null}
        />

        {/* Center canvas area */}
        <div className="flex-1 p-6 overflow-auto">
          <Canvas
            width={canvasWidth}
            height={canvasHeight}
            dpi={dpi}
            elements={elements}
            selectedId={selectedId}
            onSelectElement={setSelectedId}
            onUpdateElement={updateElement}
          />
        </div>

        {/* Right properties panel */}
        <PropertiesPanel
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          dpi={dpi}
          selectedElement={selectedElement}
          onUpdateCanvas={(updates) => {
            if (updates.canvasWidth !== undefined) setCanvasWidth(updates.canvasWidth)
            if (updates.canvasHeight !== undefined) setCanvasHeight(updates.canvasHeight)
            if (updates.dpi !== undefined) setDpi(updates.dpi)
          }}
          onUpdateElement={updateElement}
        />
      </div>
    </div>
  )
}

export default App
