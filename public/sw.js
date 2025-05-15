/// <reference lib="webworker" /> // 
// @ts-check
/** @type {ServiceWorkerGlobalScope} */
import { verifiedFetch } from 'https://esm.sh/@helia/verified-fetch'


self.addEventListener("install", function (event) {
  console.log("Hello world from the Service Worker 🤙");

});


self.addEventListener('fetch', async (event) => {
  const url = event.request.url
  const match = url.match(pathRegex) ?? url.match(subdomainRegex)

  if(!match) {
    // Not a request to an IPFS gateway, so we don't intercept it
    console.log('Not a request to an IPFS gateway, so we don\'t intercept it', url)
    return
  }
  
  const { protocol, cidOrPeerIdOrDnslink, path } = match.groups

  console.log('Intercepting request to an IPFS Gateway with @helia/verified-fetch: ', cidOrPeerIdOrDnslink, path)
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
export const pathRegex = /^.*\/(?<protocol>ip[fn]s)\/(?<cidOrPeerIdOrDnslink>[^/?#]*)(?<path>.*)$/


/**
 * `http[s]://${cid}.ipfs.example.com[/${path}]`
 * `http[s]://${dnsLinkDomain}.ipns.example.com[/${path}]`
 * `http[s]://${peerId}.ipns.example.com[/${path}]`
 *
 * @see https://regex101.com/r/EcY028/4
 * @see https://github.com/ipfs/service-worker-gateway/blob/66d3298a7d867c53123cc3f9385200add70e7766/src/lib/regex.ts#
 */
export const subdomainRegex = /^(?:https?:\/\/|\/\/)?(?<cidOrPeerIdOrDnslink>[^/]+)\.(?<protocol>ip[fn]s)\.(?<parentDomain>[^/?#]*)(?<path>.*)$/
