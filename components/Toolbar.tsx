'use client'

import { forwardRef } from 'react'
import { Share2, Download, Moon } from 'lucide-react'

interface ToolbarProps {
  roomId: string
  onExportPNG: () => void
  onExportSVG: () => void
}

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ roomId, onExportPNG, onExportSVG }, ref) => {
    const copyLink = () => {
      const url = `${window.location.origin}/r/${roomId}`
      navigator.clipboard.writeText(url)
      // You could add a toast notification here
    }

    const toggleTheme = () => {
      // Theme toggle disabled for now due to next-themes compatibility
    }

    return (
      <div
        ref={ref}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-2 border border-gray-200 dark:border-gray-700"
      >
        <button
          onClick={copyLink}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          title="Copy room link"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

        <button
          onClick={onExportPNG}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          title="Export as PNG"
        >
          <Download className="w-4 h-4" />
          PNG
        </button>

        <button
          onClick={onExportSVG}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          title="Export as SVG"
        >
          <Download className="w-4 h-4" />
          SVG
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          title="Toggle theme"
        >
          <Moon className="w-4 h-4" />
          🌙
        </button>
      </div>
    )
  }
)

Toolbar.displayName = 'Toolbar'

export default Toolbar
