"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface VideoInterludeProps {
  videoSrc: string
  posterSrc: string
  quote: string
  quoteNative?: string
  language?: "jp" | "kr"
  author?: string
  transitionType?: "dissolve" | "exposure" | "wipe"
}

export function VideoInterlude({
  videoSrc,
  posterSrc,
  quote,
  quoteNative,
  language = "jp",
  author,
  transitionType = "dissolve",
}: VideoInterludeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

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
        end: "+=150%",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => setProgress(self.progress),
      })

      if (videoRef.current && !isReducedMotion) {
        gsap.fromTo(
          videoRef.current,
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=150%",
              scrub: true,
            },
          },
        )
      }

      // Cinematic text reveal based on transition type
      if (contentRef.current && !isReducedMotion) {
        const animProps =
          transitionType === "exposure"
            ? { filter: "brightness(3)", opacity: 0 }
            : transitionType === "wipe"
              ? { clipPath: "inset(0 100% 0 0)" }
              : { opacity: 0, filter: "blur(10px)" }

        const animTo =
          transitionType === "exposure"
            ? { filter: "brightness(1)", opacity: 1 }
            : transitionType === "wipe"
              ? { clipPath: "inset(0 0% 0 0)" }
              : { opacity: 1, filter: "blur(0px)" }

        gsap.fromTo(contentRef.current, animProps, {
          ...animTo,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=50%",
            scrub: true,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isReducedMotion, transitionType])

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {isReducedMotion ? (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${posterSrc})` }} />
        ) : (
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
        )}
        <div className="absolute inset-0 bg-background/60" />
        {/* Top gradient for smooth entry */}
        <div
          className="absolute inset-x-0 top-0 h-1/3 z-10"
          style={{ background: "linear-gradient(180deg, #0f0f14 0%, transparent 100%)" }}
        />
        {/* Bottom gradient for smooth exit */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 z-10"
          style={{ background: "linear-gradient(0deg, #0f0f14 0%, transparent 100%)" }}
        />
      </div>

      {/* Centered Quote with cinematic styling */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div ref={contentRef} className="max-w-3xl text-center">
          {quoteNative && (
            <p
              className={`${language === "kr" ? "text-korean" : "text-japanese-whisper"} text-foreground/30 mb-6 tracking-[0.3em]`}
            >
              {quoteNative}
            </p>
          )}
          <blockquote className="font-serif text-2xl md:text-4xl lg:text-5xl text-foreground/90 leading-tight tracking-tight">
            &ldquo;{quote}&rdquo;
          </blockquote>
          {author && (
            <cite className="block mt-8 hud-element text-foreground/40 not-italic tracking-wider">— {author}</cite>
          )}
        </div>
      </div>

      {/* Film frame corners */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-foreground/10" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-foreground/10" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-foreground/10" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-foreground/10" />
    </section>
  )
}
