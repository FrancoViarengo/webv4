"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, ChevronUp, ChevronDown } from "lucide-react"

interface Track {
  id: string
  title: string
  titleNative: string
  language: "jp" | "kr"
  artist: string
  duration: string
}

const tracks: Track[] = [
  { id: "1", title: "Seoul Sunrise", titleNative: "서울의 일출", language: "kr", artist: "Han River Flow", duration: "4:32" },
  { id: "2", title: "Temple Bells", titleNative: "寺の鐘", language: "jp", artist: "Zen Gardens", duration: "5:18" },
  { id: "3", title: "Arirang Drift", titleNative: "아리랑", language: "kr", artist: "Tradition Reborn", duration: "3:45" },
  { id: "4", title: "Cherry Blossom Rain", titleNative: "桜の雨", language: "jp", artist: "Spring Eternal", duration: "6:02" },
]

export function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)

  // Simulate progress
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.5))
    }, 100)
    return () => clearInterval(interval)
  }, [isPlaying])

  const track = tracks[currentTrack]

  return (
    <motion.div
      className="fixed bottom-6 left-0 right-0 z-[150] flex justify-center px-4 pointer-events-none"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      {/* Progress bar at very top (hidden for pill design or integrated differently - let's hide for now to keep it clean, or radius it) */}
      <div className="h-px bg-foreground/10 relative overflow-hidden rounded-t-full hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-foreground/40"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Main player bar */}
      <div
        className={`w-full max-w-[350px] pointer-events-auto hud-border music-player-glow bg-background/90 backdrop-blur-xl border border-foreground/20 shadow-2xl ${isExpanded ? "rounded-[2rem]" : "rounded-full"
          }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Left - Track info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Visualizer bars */}
            <div className="flex items-end gap-0.5 h-4 w-8">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-foreground/40"
                  animate={{
                    height: isPlaying ? [4, 12, 8, 16, 6][i % 5] : 4,
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                    repeatType: "reverse",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground/80 truncate">{track.title}</p>
              <p className={`${track.language === "kr" ? "text-korean" : "text-japanese-whisper"} text-foreground/30 truncate`}>{track.titleNative}</p>
            </div>
          </div>

          {/* Center - Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center justify-center w-14 h-9 border border-foreground/20 rounded-full hover:border-foreground/40 hover:bg-foreground/5 transition-all"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 text-foreground/40 hover:text-foreground transition-colors hidden md:block"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Right - Expand/Time */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <span className="hud-element text-foreground/30 hidden md:block">{track.duration}</span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-foreground/40 hover:text-foreground transition-colors"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded track list */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              data-lenis-prevent
              className="border-t border-foreground/10 px-6 py-4 max-h-64 overflow-y-auto rounded-b-[2rem] no-scrollbar"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="hud-element text-foreground/30 mb-3">NOW PLAYING</p>
              <div className="space-y-2">
                {tracks.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setCurrentTrack(i)
                      setIsPlaying(true)
                      setProgress(0)
                    }}
                    className={`w-full flex items-center justify-between py-2 px-3 hover:bg-foreground/5 transition-colors ${i === currentTrack ? "bg-foreground/5 border-l-2 border-foreground/40" : ""
                      }`}
                  >
                    <div className="text-left">
                      <p className={`text-sm ${i === currentTrack ? "text-foreground" : "text-foreground/60"}`}>
                        {t.title}
                      </p>
                      <p className={`${t.language === "kr" ? "text-korean" : "text-japanese-whisper"} text-foreground/25`}>{t.titleNative}</p>
                    </div>
                    <span className="hud-element text-foreground/30">{t.duration}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
