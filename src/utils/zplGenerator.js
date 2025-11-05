// ZPL (Zebra Programming Language) Generator
// Converts canvas elements to ZPL commands for Zebra printers

/**
 * Generates ZPL code for a text element
 * @param {Object} element - Text element with x, y, width, height, props
 * @returns {string} ZPL command string
 */
function generateTextZPL(element) {
  // Convert pixels to dots (ZPL uses dots)
  const x = Math.round(element.x)
  const y = Math.round(element.y)
  const fontSize = element.props.fontSize || 16
  
  // ZPL font format: ^CF fontname,height,width
  // Using font 0 (default) with height and width based on fontSize
  const fontHeight = fontSize
  const fontWidth = fontSize
  
  // ^CF - Change Alphanumeric Default Font
  // ^FO - Field Origin (position)
  // ^FD - Field Data
  // ^FS - Field Separator
  return `^CF0,${fontHeight},${fontWidth}^FO${x},${y}^FD${element.props.text}^FS`
}

/**
 * Generates ZPL code for a rectangle element
 * @param {Object} element - Rectangle element with x, y, width, height
 * @returns {string} ZPL command string
 */
function generateRectangleZPL(element) {
  // Convert pixels to dots
  const x = Math.round(element.x)
  const y = Math.round(element.y)
  const width = Math.round(element.width)
  const height = Math.round(element.height)
  const lineWidth = 3 // Default border thickness in dots
  
  // ^FO - Field Origin (position)
  // ^GB - Graphic Box: width,height,thickness,line color,corner rounding
  // ^FS - Field Separator
  return `^FO${x},${y}^GB${width},${height},${lineWidth}^FS`
}

/**
 * Generates ZPL code for a barcode element
 * @param {Object} element - Barcode element with x, y, width, height, props
 * @returns {string} ZPL command string
 */
function generateBarcodeZPL(element) {
  // Convert pixels to dots
  const x = Math.round(element.x)
  const y = Math.round(element.y)
  const height = Math.round(element.height)
  
  const barcodeType = element.props.barcodeType || 'Code128'
  const data = element.props.text || ''
  
  // Map barcode types to ZPL commands
  let barcodeCommand = '^BC' // Default to Code 128
  
  switch (barcodeType) {
    case 'Code128':
      barcodeCommand = '^BC' // Code 128
      break
    case 'Code39':
      barcodeCommand = '^B3' // Code 39
      break
    case 'EAN13':
      barcodeCommand = '^BE' // EAN-13
      break
    case 'UPCA':
      barcodeCommand = '^BU' // UPC-A
      break
    default:
      barcodeCommand = '^BC'
  }
  
  // ^BY - Bar Code Field Default
  // width of narrow bar, wide bar to narrow bar ratio, height
  const narrowBarWidth = 3
  const ratio = 2.0
  
  // Format: ^BY width,ratio,height
  // Then: ^FO x,y
  // Then: barcode command (orientation, height, print interpretation line, ...)
  // Then: ^FD data ^FS
  return `^BY${narrowBarWidth},${ratio},${height}^FO${x},${y}${barcodeCommand}^FD${data}^FS`
}

/**
 * Generates complete ZPL code for all elements on the canvas
 * @param {Array} elements - Array of canvas elements
 * @param {number} canvasWidth - Canvas width in inches
 * @param {number} canvasHeight - Canvas height in inches
 * @param {number} dpi - Dots per inch
 * @returns {string} Complete ZPL code
 */
export function generateZPL(elements, canvasWidth, canvasHeight, dpi) {
  let zpl = '^XA\n' // Start format
  
  // Add label dimensions
  // ^PW - Print Width (in dots)
  const labelWidthDots = Math.round(canvasWidth * dpi)
  zpl += `^PW${labelWidthDots}\n`
  
  // Generate ZPL for each element
  elements.forEach(element => {
    let elementZPL = ''
    
    switch (element.type) {
      case 'text':
        elementZPL = generateTextZPL(element)
        break
      case 'rectangle':
        elementZPL = generateRectangleZPL(element)
        break
      case 'barcode':
        elementZPL = generateBarcodeZPL(element)
        break
      default:
        console.warn(`Unknown element type: ${element.type}`)
    }
    
    if (elementZPL) {
      zpl += elementZPL + '\n'
    }
  })
  
  zpl += '^XZ' // End format
  
  return zpl
}
