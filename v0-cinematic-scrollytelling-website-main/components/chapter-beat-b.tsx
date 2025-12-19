"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { ChapterData } from "@/lib/chapters-data"

interface ChapterBeatBProps {
  chapter: ChapterData
  progress: number
  transitionType?: "dissolve" | "wipe" | "diagonal" | "exposure"
}

export function ChapterBeatB({ chapter, progress, transitionType = "wipe" }: ChapterBeatBProps) {
  // Fade in as we enter beat B
  const opacity = progress < 0.4 ? 0 : Math.min(1, (progress - 0.4) * 2.5)
  const imageReveal = progress < 0.5 ? 0 : Math.min(1, (progress - 0.5) * 2)

  const getImageClipPath = () => {
    switch (transitionType) {
      case "diagonal":
        return `polygon(0 0, ${imageReveal * 200}% 0, 0 ${imageReveal * 200}%)`
      case "wipe":
        return `inset(0 ${100 - imageReveal * 100}% 0 0)`
      case "exposure":
        return `inset(0 0 0 0)`
      default:
        return `inset(0 ${100 - imageReveal * 100}% 0 0)`
    }
  }

  const getImageFilter = () => {
    if (transitionType === "exposure") {
      return `brightness(${1 + (1 - imageReveal) * 2})`
    }
    return "brightness(1)"
  }

  return (
    <motion.div className="absolute inset-0 flex items-center px-6 md:px-16 lg:px-24" style={{ opacity }}>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left: Image with cinematic reveal - Only render if imageSrc is present */}
        <div className="relative order-2 lg:order-1">
          {chapter.beatB.imageSrc && (
            <motion.div
              className="relative aspect-[4/3] overflow-hidden"
              style={{
                clipPath: getImageClipPath(),
                filter: getImageFilter(),
              }}
            >
              <Image
                src={chapter.beatB.imageSrc}
                alt={chapter.beatB.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Film frame corners */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-foreground/30" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-foreground/30" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-foreground/30" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-foreground/30" />

              {/* Frame number */}
              <div className="absolute top-3 left-8 hud-element text-foreground/40">
                FRM {String(chapter.index).padStart(3, "0")}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Text block */}
        <div className="order-1 lg:order-2 lg:pl-8">
          <div className="hud-element text-foreground/30 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500/60 animate-pulse" />
            <span>REC</span>
            <span className="text-foreground/20">|</span>
            <span>{chapter.beatA.metadata.location.toUpperCase()}</span>
          </div>

          <p className="text-lg md:text-xl lg:text-2xl text-foreground/70 leading-relaxed font-light">
            {chapter.beatB.text}
          </p>

          <p className={`${chapter.language === "kr" ? "text-korean" : "text-japanese-echo"} text-foreground/20 mt-4`}>
            {chapter.beatB.textNative || "映像の中の一瞬"}
          </p>

          <div className="mt-8 flex items-center gap-4 hud-element text-foreground/30">
            <span>ISO 800</span>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span>f/2.8</span>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span>1/60s</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
