'use client'

import { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react'
import { Tldraw } from 'tldraw'

interface WhiteboardProps {
  roomId: string
  userInfo: {
    name: string
    color: string
  }
}

export interface WhiteboardRef {
  exportPNG: () => void
  exportSVG: () => void
}

const Whiteboard = forwardRef<WhiteboardRef, WhiteboardProps>(
  ({ roomId, userInfo }, ref) => {
    const editorRef = useRef<any>(null)
    const [isReady, setIsReady] = useState(false)

    const handleMount = (editor: any) => {
      console.log('Whiteboard mounted with editor:', editor)
      editorRef.current = editor
      setIsReady(true)
    }

    const exportPNG = () => {
      if (editorRef.current) {
        editorRef.current.exportImage('png', { scale: 2 })
      }
    }

    const exportSVG = () => {
      if (editorRef.current) {
        editorRef.current.exportImage('svg')
      }
    }

    useImperativeHandle(ref, () => ({
      exportPNG,
      exportSVG,
    }))

    console.log('Whiteboard rendering, isReady:', isReady)

    return (
      <div className="h-full w-full" style={{ position: 'relative' }}>
        <Tldraw
          onMount={handleMount}
          autoFocus
        />
      </div>
    )
  }
)

Whiteboard.displayName = 'Whiteboard'

export default Whiteboard
