import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

interface LightboxProps {
  images: { src: string; alt: string }[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [onClose, onPrev, onNext])

  if (currentIndex === -1) return null

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        {/* Previous button */}
        <button
          onClick={onPrev}
          className="absolute left-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Image container */}
        <div className="relative w-[90vw] h-[90vh]">
          <Image
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.alt}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>

        {/* Next button */}
        <button
          onClick={onNext}
          className="absolute right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}
