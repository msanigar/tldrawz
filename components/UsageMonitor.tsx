'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, Info } from 'lucide-react'

interface UsageStats {
  requests: number
  duration: number
  storage: number
}

export default function UsageMonitor() {
  const [showUsage, setShowUsage] = useState(false)
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null)

  useEffect(() => {
    // This would typically fetch from Cloudflare Analytics API
    // For now, we'll show static info about free tier limits
    setUsageStats({
      requests: 0,
      duration: 0,
      storage: 0
    })
  }, [])

  if (!showUsage) {
    return (
      <button
        onClick={() => setShowUsage(true)}
        className="fixed bottom-4 right-4 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors"
        title="Usage Info"
      >
        <Info className="w-5 h-5" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-w-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Free Tier Usage
        </h3>
        <button
          onClick={() => setShowUsage(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
        <div className="flex justify-between">
          <span>Workers Requests:</span>
          <span>0 / 100,000 per day</span>
        </div>
        <div className="flex justify-between">
          <span>Durable Objects:</span>
          <span>0 / 1,000,000 per day</span>
        </div>
        <div className="flex justify-between">
          <span>R2 Storage:</span>
          <span>0 / 10GB</span>
        </div>
        <div className="flex justify-between">
          <span>R2 Operations:</span>
          <span>0 / 1,000,000 per day</span>
        </div>
      </div>

      <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center text-yellow-800 dark:text-yellow-200">
          <AlertTriangle className="w-4 h-4 mr-2" />
          <span className="text-xs">
            You&apos;re on the free tier. No billing will occur.
          </span>
        </div>
      </div>
    </div>
  )
}
