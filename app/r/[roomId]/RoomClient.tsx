'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import NameGate from '@/components/NameGate'
import Whiteboard, { WhiteboardRef } from '@/components/Whiteboard'
import Toolbar from '@/components/Toolbar'

interface RoomClientProps {
  roomId: string
}

interface UserInfo {
  name: string
  color: string
}

export default function RoomClient({ roomId }: RoomClientProps) {
  const router = useRouter()
  const whiteboardRef = useRef<WhiteboardRef>(null)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user info exists in localStorage
    const savedUserInfo = localStorage.getItem('tldrawz-user-info')
    if (savedUserInfo) {
      try {
        const parsed = JSON.parse(savedUserInfo)
        setUserInfo(parsed)
      } catch (error) {
        console.error('Failed to parse saved user info:', error)
      }
    }
    setIsLoading(false)
  }, [])

  const handleUserInfoSubmit = (info: UserInfo) => {
    setUserInfo(info)
    localStorage.setItem('tldrawz-user-info', JSON.stringify(info))
  }

  const handleExportPNG = () => {
    whiteboardRef.current?.exportPNG()
  }

  const handleExportSVG = () => {
    whiteboardRef.current?.exportSVG()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!userInfo) {
    return <NameGate onSubmit={handleUserInfoSubmit} />
  }

  return (
    <div className="h-screen flex flex-col">
      <Toolbar 
        roomId={roomId} 
        onExportPNG={handleExportPNG}
        onExportSVG={handleExportSVG}
      />
      <div className="flex-1">
        <Whiteboard ref={whiteboardRef} roomId={roomId} userInfo={userInfo} />
      </div>
    </div>
  )
}
