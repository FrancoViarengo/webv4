"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface SplitParallaxProps {
  leftImage: string
  rightImage: string
  leftAlt: string
  rightAlt: string
  caption?: string
  captionNative?: string
}

export function SplitParallax({ leftImage, rightImage, leftAlt, rightAlt, caption, captionNative }: SplitParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (!containerRef.current || isReducedMotion) return

    const ctx = gsap.context(() => {
      // Left image moves up
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { yPercent: 20 },
          {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      }

      // Right image moves down
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { yPercent: -20 },
          {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isReducedMotion])

  return (
    <section
      ref={containerRef}
      className="relative py-12 md:py-0 min-h-[80vh] md:h-screen overflow-hidden bg-background"
    >
      <div className="h-full flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="relative w-full md:w-1/2 h-[40vh] md:h-full overflow-hidden p-4 md:p-8">
          <div ref={leftRef} className="absolute inset-4 md:inset-8 shadow-2xl border-[12px] border-background z-10 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none border border-foreground/10 z-20 m-2" />
            <Image src={leftImage || "/placeholder.svg"} alt={leftAlt} fill className="object-cover" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-sepia pointer-events-none" />
          </div>
        </div>

        {/* Right Panel */}
        <div className="relative w-full md:w-1/2 h-[40vh] md:h-full overflow-hidden p-4 md:p-8">
          <div ref={rightRef} className="absolute inset-4 md:inset-8 shadow-2xl border-[12px] border-background z-10 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none border border-foreground/10 z-20 m-2" />
            <Image src={rightImage || "/placeholder.svg"} alt={rightAlt} fill className="object-cover" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-sepia pointer-events-none" />
          </div>
        </div>

        {/* Center divider line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-foreground/10 -translate-x-1/2" />

        {/* Caption overlay */}
        {caption && (
          <div className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 text-center px-6">
            {captionNative && <span className="block text-mono-metadata text-foreground/40 mb-2">{captionNative}</span>}
            <p className="font-serif text-lg md:text-xl text-foreground/80 max-w-md">{caption}</p>
          </div>
        )}
      </div>
    </section>
  )
}
