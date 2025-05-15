import Image from "next/image"
import { useState } from "react"
import Lightbox from "./lightbox"

export default function Gallery() {
  const images = [
    { src: "https://ipfs.io/ipfs/bafkreid6mqjp7g2k4f4czg2ecrupgkxy5k4u3rvpa52xoifh2tzogghtli", alt: "CID: bafkreid6mqjp7g2k4f4czg2ecrupgkxy5k4u3rvpa52xoifh2tzogghtli" },
    { src: "https://ipfs.io/ipfs/bafkreif4awbhkh6f7mwva5vsuywoqzhwe2ynumvxqkbmrnsahdxyviajp4", alt: "CID: bafkreif4awbhkh6f7mwva5vsuywoqzhwe2ynumvxqkbmrnsahdxyviajp4" },
    { src: "https://ipfs.io/ipfs/bafkreib6y2oenweorpvr2w4vmk3wqcwuvga34dupmegptcgpjf25pmx4hq", alt: "CID: bafkreib6y2oenweorpvr2w4vmk3wqcwuvga34dupmegptcgpjf25pmx4hq" },
    { src: "https://ipfs.io/ipfs/bafkreideropuzlileayopvmuwt5npjx4i4n2b4b6ttfbsyvg4vdriv5py4", alt: "CID: bafkreideropuzlileayopvmuwt5npjx4i4n2b4b6ttfbsyvg4vdriv5py4" },
    { src: "https://ipfs.io/ipfs/bafkreia2xtwwdys4dxonlzjod5yxdz7tkiut5l2sgrdrh4d52d3qpstrpy", alt: "CID: bafkreia2xtwwdys4dxonlzjod5yxdz7tkiut5l2sgrdrh4d52d3qpstrpy" },
    { src: "https://ipfs.io/ipfs/bafkreif6bdtq7zqu2gf2rijlax7xtv4l2idcoufuciwkyi42rk2tdedozi", alt: "CID: bafkreif6bdtq7zqu2gf2rijlax7xtv4l2idcoufuciwkyi42rk2tdedozi" },
    { src: "https://ipfs.io/ipfs/bafkreiaunsgdzugrr3656wtsq3tgcc4qyxqkf4csmxgvgp3pfv3aoemc2y", alt: "CID: bafkreiaunsgdzugrr3656wtsq3tgcc4qyxqkf4csmxgvgp3pfv3aoemc2y" },
    { src: "https://ipfs.io/ipfs/bafkreiegfqbibnwcxl37n77p4i7mcewustbr7x2sp2ocu42nqlt2rzoyei", alt: "CID: bafkreiegfqbibnwcxl37n77p4i7mcewustbr7x2sp2ocu42nqlt2rzoyei" },
    { src: "https://ipfs.io/ipfs/bafkreiephehhm6ksjzmwed6gvbbwbtk3sw4skai5zzmlr3elsj2ts4wkzq", alt: "CID: bafkreiephehhm6ksjzmwed6gvbbwbtk3sw4skai5zzmlr3elsj2ts4wkzq" },

    // Keep these for testing subdomain gateway link
    // { src: "https://bafkreid6mqjp7g2k4f4czg2ecrupgkxy5k4u3rvpa52xoifh2tzogghtli.ipfs.w3s.link", alt: "Photo CID: bafkreid6mqjp7g2k4f4czg2ecrupgkxy5k4u3rvpa52xoifh2tzogghtli" },
    // { src: "https://bafkreif4awbhkh6f7mwva5vsuywoqzhwe2ynumvxqkbmrnsahdxyviajp4.ipfs.w3s.link", alt: "Photo CID: bafkreif4awbhkh6f7mwva5vsuywoqzhwe2ynumvxqkbmrnsahdxyviajp4" },
    // { src: "https://bafkreib6y2oenweorpvr2w4vmk3wqcwuvga34dupmegptcgpjf25pmx4hq.ipfs.w3s.link", alt: "Photo CID: bafkreib6y2oenweorpvr2w4vmk3wqcwuvga34dupmegptcgpjf25pmx4hq" },
    // { src: "https://bafkreideropuzlileayopvmuwt5npjx4i4n2b4b6ttfbsyvg4vdriv5py4.ipfs.w3s.link", alt: "Photo CID: bafkreideropuzlileayopvmuwt5npjx4i4n2b4b6ttfbsyvg4vdriv5py4" },
    // { src: "https://bafkreif6bdtq7zqu2gf2rijlax7xtv4l2idcoufuciwkyi42rk2tdedozi.ipfs.w3s.link", alt: "Photo CID: bafkreif6bdtq7zqu2gf2rijlax7xtv4l2idcoufuciwkyi42rk2tdedozi" },
    // { src: "https://bafkreiaunsgdzugrr3656wtsq3tgcc4qyxqkf4csmxgvgp3pfv3aoemc2y.ipfs.w3s.link", alt: "Photo CID: bafkreiaunsgdzugrr3656wtsq3tgcc4qyxqkf4csmxgvgp3pfv3aoemc2y" },
    // { src: "https://bafkreiephehhm6ksjzmwed6gvbbwbtk3sw4skai5zzmlr3elsj2ts4wkzq.ipfs.w3s.link", alt: "Photo CID: bafkreiephehhm6ksjzmwed6gvbbwbtk3sw4skai5zzmlr3elsj2ts4wkzq" },
    // { src: "https://bafkreiegfqbibnwcxl37n77p4i7mcewustbr7x2sp2ocu42nqlt2rzoyei.ipfs.w3s.link", alt: "Photo CID: bafkreiegfqbibnwcxl37n77p4i7mcewustbr7x2sp2ocu42nqlt2rzoyei" },
    // { src: "https://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi.ipfs.w3s.link", alt: "Photo CID: bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi" },
  ]

  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const openLightbox = (index: number) => {
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = "hidden"
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(-1)
    // Allow scrolling when lightbox is closed
    document.body.style.overflow = "auto"
  }

  const goToPrevious = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const goToNext = () => {
    setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square relative overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black opacity-0 group-hover:opacity-80 transition-all duration-300">
              <p className="text-white p-4 w-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                {image.alt}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onPrev={goToPrevious}
        onNext={goToNext}
      />
    </div>
  )
}
