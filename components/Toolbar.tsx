'use client'

import { useState, useEffect } from 'react'
import { 
  Copy, 
  Download, 
  Share2,
  Check
} from 'lucide-react'

interface ToolbarProps {
  roomId: string
  onExportPNG?: () => void
  onExportSVG?: () => void
}

export default function Toolbar({ roomId, onExportPNG, onExportSVG }: ToolbarProps) {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyInviteLink = async () => {
    const url = `${window.location.origin}/r/${roomId}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  const toggleTheme = () => {
    // Theme toggle temporarily disabled
    console.log('Theme toggle disabled')
  }

  if (!mounted) {
    return (
      <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Room: {roomId}
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={copyInviteLink}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          title="Copy invite link"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        </button>

        <button
          onClick={onExportPNG}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          title="Export as PNG"
        >
          <Download className="w-5 h-5" />
        </button>

        <button
          onClick={onExportSVG}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          title="Export as SVG"
        >
          <Share2 className="w-5 h-5" />
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          title="Toggle theme (disabled)"
        >
          🌙
        </button>
      </div>
    </div>
  )
}
