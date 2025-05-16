import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import ServiceWorkerButton from '@/components/service-worker-button'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>IPFS Gateway Escape Gallery</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
      <ServiceWorkerButton />
    </>
  )
}
