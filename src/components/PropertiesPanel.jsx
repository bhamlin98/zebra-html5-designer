export default function PropertiesPanel({
  canvasWidth,
  canvasHeight,
  dpi,
  selectedElement,
  onUpdateCanvas,
  onUpdateElement,
}) {
  const pxToInches = (px) => (px / dpi).toFixed(3)
  const inchesToPx = (inches) => parseFloat(inches) * dpi

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Canvas Properties */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Canvas Settings</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width (inches)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="20"
                value={canvasWidth}
                onChange={(e) => onUpdateCanvas({ canvasWidth: parseFloat(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (inches)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="20"
                value={canvasHeight}
                onChange={(e) => onUpdateCanvas({ canvasHeight: parseFloat(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                DPI (Dots Per Inch)
              </label>
              <select
                value={dpi}
                onChange={(e) => onUpdateCanvas({ dpi: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="72">72 DPI</option>
                <option value="96">96 DPI</option>
                <option value="150">150 DPI</option>
                <option value="203">203 DPI</option>
                <option value="300">300 DPI</option>
                <option value="600">600 DPI</option>
              </select>
            </div>
          </div>
        </div>

        {/* Element Properties */}
        {selectedElement && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Element Properties
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <input
                  type="text"
                  value={selectedElement.type}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    X (inches)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={pxToInches(selectedElement.x)}
                    onChange={(e) =>
                      onUpdateElement(selectedElement.id, {
                        x: inchesToPx(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Y (inches)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={pxToInches(selectedElement.y)}
                    onChange={(e) =>
                      onUpdateElement(selectedElement.id, {
                        y: inchesToPx(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Width (inches)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    value={pxToInches(selectedElement.width)}
                    onChange={(e) =>
                      onUpdateElement(selectedElement.id, {
                        width: inchesToPx(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (inches)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    value={pxToInches(selectedElement.height)}
                    onChange={(e) =>
                      onUpdateElement(selectedElement.id, {
                        height: inchesToPx(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rotation (degrees)
                </label>
                <input
                  type="number"
                  step="1"
                  value={selectedElement.rotation}
                  onChange={(e) =>
                    onUpdateElement(selectedElement.id, {
                      rotation: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Type-specific properties */}
              {selectedElement.type === 'text' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Text Content
                    </label>
                    <input
                      type="text"
                      value={selectedElement.props.text}
                      onChange={(e) =>
                        onUpdateElement(selectedElement.id, {
                          props: { ...selectedElement.props, text: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Font Size (px)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="8"
                      max="72"
                      value={selectedElement.props.fontSize}
                      onChange={(e) =>
                        onUpdateElement(selectedElement.id, {
                          props: {
                            ...selectedElement.props,
                            fontSize: parseInt(e.target.value) || 16,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {selectedElement.type === 'barcode' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Barcode Data
                    </label>
                    <input
                      type="text"
                      value={selectedElement.props.text}
                      onChange={(e) =>
                        onUpdateElement(selectedElement.id, {
                          props: { ...selectedElement.props, text: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Barcode Type
                    </label>
                    <select
                      value={selectedElement.props.barcodeType}
                      onChange={(e) =>
                        onUpdateElement(selectedElement.id, {
                          props: { ...selectedElement.props, barcodeType: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Code128">Code 128</option>
                      <option value="Code39">Code 39</option>
                      <option value="EAN13">EAN-13</option>
                      <option value="UPCA">UPC-A</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {!selectedElement && (
          <div className="text-center text-gray-500 py-8">
            <p>No element selected</p>
            <p className="text-sm mt-2">Click on an element to edit its properties</p>
          </div>
        )}
      </div>
    </div>
  )
}
