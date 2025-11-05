# Zebra HTML5 Designer - Modern React Edition

A modern Zebra label designer built with React, Vite, and Tailwind CSS. Design labels with text, rectangles, and barcodes with an intuitive drag-and-drop interface.

## Features

- **Modern Tech Stack**: Built with React 19, Vite, and Tailwind CSS
- **Drag & Drop**: Click and drag elements to reposition them on the canvas
- **Element Types**: 
  - Text with customizable font size
  - Rectangles for borders and shapes
  - Barcodes (Code 128, Code 39, EAN-13, UPC-A)
- **Canvas Settings**: Specify label dimensions in inches with configurable DPI (72-600)
- **Alignment Tools**: Align elements horizontally (left, center, right) and vertically (top, middle, bottom)
- **Properties Inspector**: Edit element positions, sizes, and properties in real-time
- **Keyboard Controls**: 
  - Arrow keys to nudge selected elements (1px, or 10px with Shift)
  - Delete/Backspace to remove selected elements
- **Persistence**: Auto-save to localStorage
- **Import/Export**: Save and load designs as JSON files

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Usage

1. **Set Canvas Size**: Use the right panel to set your label dimensions in inches and choose DPI
2. **Add Elements**: Click buttons in the left toolbar to add text, rectangles, or barcodes
3. **Edit Elements**: Click an element to select it, then edit properties in the right panel
4. **Move Elements**: Click and drag elements to reposition them on the canvas
5. **Align Elements**: Use alignment buttons to align selected elements to canvas edges or center
6. **Save/Load**: Export your design as JSON or import previously saved designs

## Technical Details

### DPI and Units

- Canvas dimensions are specified in **inches**
- DPI (Dots Per Inch) controls the pixel density
- Internally, all positions and sizes are stored in pixels
- The UI displays and accepts values in inches for user convenience
- Formula: `pixels = inches × DPI`

### Element Structure

Each element has the following structure:

```javascript
{
  id: number,
  type: 'text' | 'rectangle' | 'barcode',
  x: number,        // pixels from left
  y: number,        // pixels from top
  width: number,    // pixels
  height: number,   // pixels
  rotation: number, // degrees
  props: {
    // Type-specific properties
    text: string,          // for text and barcode
    fontSize: number,      // for text
    barcodeType: string,   // for barcode
  }
}
```

### Architecture

- **App.jsx**: Main application component managing global state
- **Toolbar.jsx**: Left sidebar with element creation and alignment controls
- **Canvas.jsx**: Center canvas area with drag-and-drop functionality
- **PropertiesPanel.jsx**: Right sidebar for editing element and canvas properties

### Drag & Drop Implementation

- Uses Pointer Events API for smooth cross-device support
- Implements pointer capture for reliable dragging
- Constrains element movement to canvas bounds
- Updates element positions in real-time during drag

### Persistence

- Automatically saves to browser localStorage on every state change
- Persists canvas settings, elements, and element properties
- Can export/import as JSON for sharing or backup

## Legacy Version

The original AngularJS version has been moved to the `legacy/` folder for reference.

## Why This Redesign?

The original version was built with AngularJS and jQuery. This modern version provides:

- Better performance with React's virtual DOM
- Modern development experience with Vite's fast HMR
- Responsive design with Tailwind CSS
- Improved UX with drag-and-drop and alignment tools
- Better maintainability with component-based architecture
- Type-safe development potential (easy to migrate to TypeScript)

## License

This project maintains the same open-source spirit as the original Zebra HTML5 Designer.

## Credits

Original concept and implementation by the zebra-html5-designer project.
Modernized and enhanced with React, Vite, and Tailwind CSS.
