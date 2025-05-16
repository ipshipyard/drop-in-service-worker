import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useServiceWorker } from '@/hooks/use-service-worker'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  const isSWInstalling = useServiceWorker()

  if (isSWInstalling) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>IPFS Gateway Escape Gallery</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
