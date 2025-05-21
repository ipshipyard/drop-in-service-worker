import { useEffect, useState } from 'react'

export function useServiceWorker() {
  const [isSWActive, setIsSWActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window == 'undefined' || !('serviceWorker' in navigator)) {
      setError('Service Worker is not supported by this browser')
      return
    }

    navigator.serviceWorker
      .register('/sw.js', { type: 'module' })
      .then(async (registration) => {
        if (registration.installing) {
          console.log('Service Worker installing')
        } else if (registration.waiting) {
          console.log('Service Worker installed')
        } else if (registration.active) {
          console.log('Service Worker active')
        }

        // 👇 wait for the service worker to be active
        await navigator.serviceWorker.ready
        setIsSWActive(true)
      })
      .catch((err) => {
        setError(`Service Worker registration failed ${err.message}`)
      })
  }, [])

  return { isSWActive, error }
}
