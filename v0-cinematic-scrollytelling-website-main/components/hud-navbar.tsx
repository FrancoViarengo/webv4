"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, Volume2 } from "lucide-react"
import { chapters } from "@/lib/chapters-data"

interface HUDNavbarProps {
  onNavigate: (chapterId: string) => void
  onOpenAuth: () => void
  currentChapter?: number
}

export function HUDNavbar({ onNavigate, onOpenAuth, currentChapter = 1 }: HUDNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [time, setTime] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const handleNavClick = (chapterId: string) => {
    setIsMenuOpen(false)
    onNavigate(chapterId)
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {/* Top gradient fade */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(15,15,20,0.8) 0%, transparent 100%)" }}
        />

        {/* HUD Corner Elements */}
        <nav className="relative p-4 md:p-6">
          {/* Top Left - Menu */}
          <div className="absolute top-4 md:top-6 left-4 md:left-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="hud-border px-3 py-2 flex items-center gap-2 text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-all group"
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4" />
              <span className="hud-element hidden md:block">INDEX</span>
            </button>
          </div>

          {/* Top Center - Logo */}
          <motion.div
            className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 text-center"
            animate={{ opacity: isScrolled ? 0.6 : 1 }}
          >
            <h1 className="text-lg md:text-xl font-light tracking-[0.4em] text-foreground">NIHON</h1>
            <p className="text-japanese-echo text-foreground/30">日本紀行</p>
          </motion.div>

          {/* Top Right - User & Time */}
          <div className="absolute top-4 md:top-6 right-4 md:right-6 flex items-center gap-3">
            <span className="hud-element text-foreground/40 hidden md:block">{time}</span>
            <button
              onClick={onOpenAuth}
              className="hud-border px-3 py-2 flex items-center gap-2 text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-all"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
              <span className="hud-element hidden md:block">ENTER</span>
            </button>
          </div>

          {/* Bottom Left - Chapter indicator (appears on scroll) */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                className="fixed bottom-6 left-4 md:left-6 hud-border px-3 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <span className="hud-element text-foreground/50">CH.{String(currentChapter).padStart(2, "0")}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Right - Scroll progress (appears on scroll) */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                className="fixed bottom-6 right-4 md:right-6 flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="hud-border px-3 py-2 flex items-center gap-2">
                  <Volume2 className="w-3 h-3 text-foreground/50" />
                  <span className="hud-element text-foreground/50">AMBIENT</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Exposure flash background */}
            <motion.div
              className="absolute inset-0 bg-foreground"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />

            <motion.div
              className="absolute inset-0 bg-background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            />

            {/* Close Button */}
            <motion.button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 md:top-6 left-4 md:left-6 hud-border px-3 py-2 flex items-center gap-2 text-foreground/70 hover:text-foreground transition-all z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
              <span className="hud-element hidden md:block">CLOSE</span>
            </motion.button>

            {/* Menu Content */}
            <div className="h-full flex flex-col justify-center px-6 md:px-24 py-24">
              <nav className="space-y-1 md:space-y-2">
                {chapters.map((chapter, index) => (
                  <motion.button
                    key={chapter.id}
                    onClick={() => handleNavClick(chapter.id)}
                    className="block w-full text-left group py-2"
                    initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                    animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3 + index * 0.1,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <div className="flex items-baseline gap-4 md:gap-8">
                      <span className="hud-element text-foreground/30 w-12">
                        {String(chapter.index).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <span className="text-2xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground/70 group-hover:text-foreground transition-all duration-500 text-editorial block">
                          {chapter.title}
                        </span>
                        <span className="text-japanese-echo text-foreground/25 group-hover:text-foreground/40 transition-all mt-1">
                          {chapter.titleJp}
                        </span>
                      </div>
                    </div>
                    {/* Hover line */}
                    <div className="h-px bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-500 mt-2 ml-16 md:ml-20" />
                  </motion.button>
                ))}
              </nav>

              {/* Footer */}
              <motion.div
                className="absolute bottom-8 left-6 md:left-24 right-6 md:right-24 flex justify-between items-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="hud-element text-foreground/30">
                  <p>A CINEMATIC JOURNEY</p>
                  <p className="text-japanese-echo mt-1">映画的な旅</p>
                </div>
                <div className="hud-element text-foreground/30 text-right">
                  <p>SCROLL TO EXPLORE</p>
                  <p>2024</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
