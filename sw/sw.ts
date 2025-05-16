/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

import { verifiedFetch } from '@helia/verified-fetch'

self.addEventListener('install', (event) => {
  // force the service worker to become the active service worker.
  self.skipWaiting()
  console.log('🧰: service worker install event')
})

// Service workers don't immediately "claim" the sessions that load them,
// meaning that until your user refreshes the page your service worker
// will be inactive.  By calling claim() we ensure that the service worker
// will be active immediately.
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
  console.log('🧰: service worker activate event!')
  // Forces the recently loaded service worker to take over
})

self.addEventListener('fetch', async (event) => {
  const url = event.request.url
  const match = url.match(pathGatewayRegex) ?? url.match(subdomainGatewayRegex)

  if (match?.groups == null) {
    console.log("🧰: Not a request to an IPFS gateway, so we don't intercept it", url)
    return
  }

  const { protocol, cidOrPeerIdOrDnslink, path } = match.groups

  console.log(
    '🧰: Intercepting request to an IPFS Gateway with @helia/verified-fetch: ',
    cidOrPeerIdOrDnslink,
    path,
  )
  event.respondWith(verifiedFetch(`${protocol}://${cidOrPeerIdOrDnslink}/${path}`))
})

/**
 * `http[s]://example.com/ipfs/${cid}[/${path}]`
 * `/ipfs/${cid}[/${path}]`
 * `/ipns/${dnsLinkDomain}[/${path}]`
 * `/ipns/${peerId}[/${path}]`
 *
 * @see https://regex101.com/r/zdDp0i/1
 * @see https://github.com/ipfs/service-worker-gateway/blob/66d3298a7d867c53123cc3f9385200add70e7766/src/lib/regex.ts#
 */
export const pathGatewayRegex = /^.*\/(?<protocol>ip[fn]s)\/(?<cidOrPeerIdOrDnslink>[^/?#]*)(?<path>.*)$/

/**
 * `http[s]://${cid}.ipfs.example.com[/${path}]`
 * `http[s]://${dnsLinkDomain}.ipns.example.com[/${path}]`
 * `http[s]://${peerId}.ipns.example.com[/${path}]`
 *
 * @see https://regex101.com/r/EcY028/4
 * @see https://github.com/ipfs/service-worker-gateway/blob/66d3298a7d867c53123cc3f9385200add70e7766/src/lib/regex.ts#
 */
export const subdomainGatewayRegex =
  /^(?:https?:\/\/|\/\/)?(?<cidOrPeerIdOrDnslink>[^/]+)\.(?<protocol>ip[fn]s)\.(?<parentDomain>[^/?#]*)(?<path>.*)$/
