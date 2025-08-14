'use client'

import { useRouter } from 'next/navigation'
import { generateRoomId } from '@/lib/id'
import { env } from '@/lib/env'

export default function HomePage() {
  const router = useRouter()

  const handleCreateBoard = () => {
    const roomId = generateRoomId()
    router.push(`/r/${roomId}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
            {env.NEXT_PUBLIC_APP_NAME || 'Tldrawz'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Create collaborative whiteboards with real-time sync powered by tldraw and Cloudflare
          </p>
        </div>
        
        <button
          onClick={handleCreateBoard}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          Create New Board
        </button>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Share the link with others to collaborate in real-time
        </div>
      </div>
    </div>
  )
}
