"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

interface SilentSectionProps {
  videoSrc?: string
  posterSrc: string
  duration?: "short" | "medium" | "long"
  ambientText?: string
  ambientTextNative?: string
  language?: "jp" | "kr"
}

export function SilentSection({
  videoSrc,
  posterSrc,
  duration = "medium",
  ambientText,
  ambientTextNative,
  language = "jp",
}: SilentSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = useState(0)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  const heightMap = {
    short: "150vh",
    medium: "200vh",
    long: "300vh",
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${heightMap[duration]}`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => setProgress(self.progress),
      })

      // Very subtle zoom
      if (videoRef.current && !isReducedMotion) {
        gsap.fromTo(
          videoRef.current,
          { scale: 1 },
          {
            scale: 1.03,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: `+=${heightMap[duration]}`,
              scrub: true,
            },
          },
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [duration, isReducedMotion])

  // Ambient text fades in at 30% and out at 70%
  const textOpacity = progress < 0.3 ? 0 : progress > 0.7 ? 0 : Math.min(1, (progress - 0.3) * 5, (0.7 - progress) * 5)

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      aria-label="Silent contemplation section"
    >
      {/* Video/Image Background */}
      <div className="absolute inset-0 overflow-hidden">
        {videoSrc && !isReducedMotion ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={posterSrc}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${posterSrc})` }} />
        )}

        {/* Very subtle overlay - less than other sections */}
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Ambient text - very subtle, almost subliminal */}
      {ambientText && (
        <motion.div className="absolute inset-0 flex items-center justify-center px-6" style={{ opacity: textOpacity }}>
          <div className="text-center max-w-2xl">
            {ambientTextNative && (
              <p
                className={`${language === "kr" ? "text-korean" : "text-japanese-whisper"} text-foreground/20 mb-4 tracking-[0.3em] ambient-pulse`}
              >
                {ambientTextNative}
              </p>
            )}
            <p className="text-lg md:text-xl text-foreground/30 font-light tracking-wide leading-loose">
              {ambientText}
            </p>
          </div>
        </motion.div>
      )}

      {/* Corner marks - very minimal HUD elements */}
      <div className="absolute top-8 left-8 w-6 h-6 border-l border-t border-foreground/10" />
      <div className="absolute top-8 right-8 w-6 h-6 border-r border-t border-foreground/10" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-l border-b border-foreground/10" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-r border-b border-foreground/10" />
    </section>
  )
}
