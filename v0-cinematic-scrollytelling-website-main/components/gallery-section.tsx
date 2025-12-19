"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface GalleryImage {
  src: string
  alt: string
  aspectRatio: "portrait" | "landscape" | "square"
}

interface GallerySectionProps {
  title: string
  titleNative?: string
  images: GalleryImage[]
  transitionType?: "stagger" | "cascade" | "exposure"
}

export function GallerySection({ title, titleNative, images, transitionType = "stagger" }: GallerySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Header reveal with wipe
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // Image reveals based on transition type
      imagesRef.current.forEach((img, i) => {
        if (!img) return

        const fromProps =
          transitionType === "exposure"
            ? { opacity: 0, filter: "brightness(3)" }
            : transitionType === "cascade"
              ? { opacity: 0, y: 100, rotateX: 15 }
              : { opacity: 0, y: 60, scale: 0.95 }

        const toProps =
          transitionType === "exposure"
            ? { opacity: 1, filter: "brightness(1)" }
            : transitionType === "cascade"
              ? { opacity: 1, y: 0, rotateX: 0 }
              : { opacity: 1, y: 0, scale: 1 }

        gsap.fromTo(img, fromProps, {
          ...toProps,
          duration: transitionType === "exposure" ? 0.6 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: transitionType === "cascade" ? i * 0.1 : 0,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [transitionType])

  const getAspectClass = (ratio: GalleryImage["aspectRatio"]) => {
    switch (ratio) {
      case "portrait":
        return "aspect-[3/4] row-span-2"
      case "landscape":
        return "aspect-[16/9] col-span-2"
      case "square":
        return "aspect-square"
    }
  }

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 lg:py-40 px-6 md:px-16 lg:px-24 bg-background">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16">
        <div ref={headerRef}>
          {titleNative && (
            <span className="block text-japanese-whisper text-foreground/30 tracking-[0.3em] mb-3">{titleNative}</span>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-editorial text-foreground tracking-tight">
            {title}
          </h2>
        </div>
        <div className="w-24 h-px bg-foreground/20 mt-6" />
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        {images.map((image, index) => (
          <div
            key={index}
            ref={(el) => {
              imagesRef.current[index] = el
            }}
            className={`relative overflow-hidden group ${getAspectClass(image.aspectRatio)}`}
          >
            {/* Vintage Picture Frame Effect */}
            <div className="absolute inset-0 z-10 pointer-events-none border-[12px] border-background shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
            <div className="absolute inset-0 z-10 pointer-events-none border border-foreground/20 m-3" />

            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Film frame overlay on hover - simplified for vintage look */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
              <div className="absolute top-4 left-4 w-full h-full border border-accent/50" />
            </div>
            <div className="absolute inset-0 bg-primary/20 mix-blend-sepia group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  )
}
