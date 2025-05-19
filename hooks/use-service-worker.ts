import { useEffect, useState, useCallback } from 'react'

export function useServiceWorker() {
  const [isInstalling, setIsInstalling] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.error('Service Worker is not supported by this browser')
      return
    }

    // Check if service worker is already installed
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg?.active) {
        setIsInstalled(true)
      }
    })
  }, [])

  const install = useCallback(async () => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.error('Service Worker is not supported by this browser')
      return
    }

    try {
      setIsInstalling(true)
      const reg = await navigator.serviceWorker.register('/sw.js', { type: 'module' })
      setIsInstalling(false)
      setIsInstalled(true)
      if (reg.installing) {
        console.log('Service Worker installing')
      } else if (reg.waiting) {
        console.log('Service Worker installed')
      } else if (reg.active) {
        console.log('Service Worker active')
      }
    } catch (err) {
      console.error('Service Worker registration failed', err)
      setIsInstalling(false)
    }
  }, [])

  return { isInstalling, isInstalled, install }
}
