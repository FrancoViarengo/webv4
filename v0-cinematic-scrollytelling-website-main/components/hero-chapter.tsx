"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChapterBeatA } from "./chapter-beat-a"
import { ChapterBeatB } from "./chapter-beat-b"
import type { ChapterData } from "@/lib/chapters-data"

gsap.registerPlugin(ScrollTrigger)

interface HeroChapterProps {
  chapter: ChapterData
  isFirst?: boolean
  transitionType?: "dissolve" | "wipe" | "exposure" | "soft" | "diagonal"
}

export function HeroChapter({ chapter, isFirst = false, transitionType = "dissolve" }: HeroChapterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
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
        end: "+=200%",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => setProgress(self.progress),
      })

      if (videoRef.current && !isReducedMotion) {
        gsap.fromTo(
          videoRef.current,
          { scale: 1 },
          {
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=200%",
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
      id={chapter.id}
      className="relative h-screen w-full overflow-hidden"
      aria-label={`Chapter ${chapter.index}: ${chapter.title}`}
    >
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        {isReducedMotion ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${chapter.posterSrc})` }}
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={chapter.posterSrc}
            className="absolute inset-0 w-full h-full object-cover video-background"
          >
            <source src={chapter.videoSrc} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 cinematic-overlay" />
        <div
          className="absolute inset-x-0 top-0 h-1/3"
          style={{ background: "linear-gradient(180deg, rgba(15,15,20,0.6) 0%, transparent 100%)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: "linear-gradient(0deg, #0f0f14 0%, transparent 100%)" }}
        />
      </div>

      <ChapterBeatA chapter={chapter} progress={progress} transitionType={transitionType} />
      <ChapterBeatB chapter={chapter} progress={progress} transitionType={transitionType} />

      {/* Chapter number indicator */}
      <div className="absolute bottom-8 right-6 md:right-16 lg:right-24 hud-element text-foreground/20">
        {String(chapter.index).padStart(2, "0")} / 06
      </div>
    </section>
  )
}
