"use client"

import { motion } from "framer-motion"
import type { ChapterData } from "@/lib/chapters-data"

interface ChapterBeatAProps {
  chapter: ChapterData
  progress: number
  transitionType?: "dissolve" | "wipe" | "exposure" | "soft"
}

export function ChapterBeatA({ chapter, progress, transitionType = "dissolve" }: ChapterBeatAProps) {
  // Fade out as we approach beat B
  const opacity = progress < 0.4 ? 1 : Math.max(0, 1 - (progress - 0.4) * 2.5)

  const getExitTransform = () => {
    switch (transitionType) {
      case "wipe":
        return { clipPath: `inset(0 0 ${progress > 0.4 ? (progress - 0.4) * 250 : 0}% 0)` }
      case "exposure":
        return { filter: `brightness(${1 + (progress > 0.4 ? (progress - 0.4) * 3 : 0)})` }
      case "soft":
        return { transform: `translateY(${progress > 0.4 ? (progress - 0.4) * -100 : 0}px)` }
      default:
        return {}
    }
  }

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24"
      style={{ opacity, ...getExitTransform() }}
    >
      {/* Metadata top */}
      <div className="absolute top-24 md:top-32 left-6 md:left-16 lg:left-24">
        <motion.div
          className="hud-element text-foreground/40 space-y-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p>CH.{String(chapter.index).padStart(2, "0")}</p>
          <p>{chapter.beatA.metadata.location.toUpperCase()}</p>
          <p className="text-foreground/25">{chapter.beatA.metadata.coordinates}</p>
        </motion.div>
      </div>

      {/* Main headline */}
      <div className="max-w-4xl">
        <motion.h2
          className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tight text-editorial text-foreground leading-[0.9] mb-2"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {chapter.beatA.headline}
        </motion.h2>

        <motion.p
          className={`${chapter.language === "kr" ? "text-korean" : "text-japanese-echo"} text-foreground/30 mb-6 md:mb-8`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {chapter.titleNative}
        </motion.p>

        <motion.p
          className="text-base md:text-xl text-foreground/60 max-w-xl leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {chapter.beatA.caption}
        </motion.p>
      </div>

      {/* Season indicator */}
      <motion.div
        className="absolute bottom-24 md:bottom-32 right-6 md:right-16 lg:right-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="hud-element text-foreground/30 text-right">
          <p>SEASON</p>
          <p className="text-foreground/50">{chapter.beatA.metadata.season.toUpperCase()}</p>
        </div>
      </motion.div>

      {/* Scroll indicator with film frame aesthetic */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <span className="hud-element text-foreground/30">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-foreground/30 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
