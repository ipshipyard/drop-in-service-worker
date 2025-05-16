import { useState } from 'react'
import { useServiceWorker } from '@/hooks/use-service-worker'

export default function ServiceWorkerButton() {
  const { isInstalling, isInstalled, install } = useServiceWorker()
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible || isInstalled) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm">
        <h3 className="text-lg font-semibold mb-2">Install Drop-in Service Worker</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Install the service worker to intercept IPFS gateway requests and enable direct (P2P and trustless gateway) & verified IPFS content retrieval
        </p>
        <div className="flex gap-2">
          <button
            onClick={install}
            disabled={isInstalling}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {isInstalling ? 'Installing...' : 'Install'}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-4 py-2"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
} 
