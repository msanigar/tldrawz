'use client'

import { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react'
import { Tldraw, inlineBase64AssetStore } from 'tldraw'
import { useSync } from '@tldraw/sync'
import { env } from '@/lib/env'

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
    
    // Create synced store using Cloudflare backend
    const store = useSync({
      uri: `${env.NEXT_PUBLIC_SYNC_URL}?roomId=${roomId}`,
      userInfo: {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        name: userInfo.name,
        color: userInfo.color,
      },
      assets: inlineBase64AssetStore,
    })

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

    console.log('Whiteboard rendering, isReady:', isReady, 'roomId:', roomId, 'store status:', store.status)

    return (
      <div className="h-full w-full" style={{ position: 'relative' }}>
        <Tldraw
          store={store}
          onMount={handleMount}
          autoFocus
        />
      </div>
    )
  }
)

Whiteboard.displayName = 'Whiteboard'

export default Whiteboard
