import Gallery from "../components/gallery"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">IPFS Drop-in Service Worker Example</h1>
        <Gallery />
      </div>
    </div>
  )
}
