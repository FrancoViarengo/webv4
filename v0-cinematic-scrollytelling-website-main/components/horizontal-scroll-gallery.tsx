"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface HorizontalImage {
  src: string
  alt: string
  caption?: string
}

interface HorizontalScrollGalleryProps {
  images: HorizontalImage[]
  title?: string
  titleNative?: string
}

export function HorizontalScrollGallery({ images, title, titleNative }: HorizontalScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const track = trackRef.current!
      const totalWidth = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-background">
      {/* Header */}
      {title && (
        <div className="absolute top-8 left-6 md:left-16 z-10">
          {titleNative && (
            <span className="block text-mono-metadata text-foreground/40 tracking-widest mb-1">{titleNative}</span>
          )}
          <h2 className="font-display text-display-sm md:text-display-md text-foreground">{title}</h2>
        </div>
      )}

      {/* Horizontal Track */}
      <div ref={trackRef} className="flex items-center h-full gap-6 md:gap-8 px-6 md:px-16 pt-24">
        {images.map((image, index) => (
          <div key={index} className="relative flex-shrink-0 h-[60vh] md:h-[70vh] w-[70vw] md:w-[50vw] lg:w-[40vw]">
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            {/* Caption */}
            {image.caption && (
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-serif text-sm md:text-base text-foreground/80">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-6 md:right-16 flex items-center gap-3 text-foreground/40">
        <span className="text-mono-metadata tracking-widest">SCROLL</span>
        <div className="w-12 h-px bg-foreground/30" />
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-50">
          <path
            d="M4 10h12m0 0l-4-4m4 4l-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
