import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useServiceWorker } from '@/hooks/useServiceWorker'

export default function App({ Component, pageProps }: AppProps) {
  useServiceWorker()

  return <Component {...pageProps} />
}
