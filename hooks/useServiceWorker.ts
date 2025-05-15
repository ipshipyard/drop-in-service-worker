import { useEffect } from 'react'

export function useServiceWorker() {
  useEffect(() => {
    if (typeof window == 'undefined' || !('serviceWorker' in navigator)) {
      console.error('Service worker not supported')
      return
    }

    // Register the service worker after event listeners are added
    navigator.serviceWorker
      .register('/sw.js', { type: 'module' })
      .then((registration) => {
        if (registration.installing) {
          console.log('Service worker installing')
        } else if (registration.waiting) {
          console.log('Service worker installed')
        } else if (registration.active) {
          console.log('Service worker active')
        }
      })
      .catch((err) => {
        console.error('Service worker registration failed', err)
      })
  }, [])
}
