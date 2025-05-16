import { useEffect, useState } from 'react'

export function useServiceWorker() {
  const [isInstalling, setIsInstalling] = useState(true)

  useEffect(() => {
    if (typeof window == 'undefined' || !('serviceWorker' in navigator)) {
      console.error('Service Worker is not supported by this browser')
      setIsInstalling(false)
      return
    }

    navigator.serviceWorker
      .register('/sw.js', { type: 'module' })
      .then((registration) => {
        setIsInstalling(false)
        if (registration.installing) {
          console.log('Service Worker installing')
        } else if (registration.waiting) {
          console.log('Service Worker installed')
        } else if (registration.active) {
          console.log('Service Worker active')
        }
      })
      .catch((err) => {
        console.error('Service Worker registration failed', err)
        setIsInstalling(false)
      })
  }, [])

  return isInstalling
}
