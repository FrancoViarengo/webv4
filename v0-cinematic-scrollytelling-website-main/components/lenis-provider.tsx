"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

interface LenisProviderProps {
  children: React.ReactNode
  onLenisReady?: (lenis: Lenis) => void
}

export function LenisProvider({ children, onLenisReady }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    if (onLenisReady) {
      onLenisReady(lenis)
    }

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [onLenisReady])

  return <>{children}</>
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  const setLenis = (lenis: Lenis) => {
    lenisRef.current = lenis
  }

  const scrollTo = (target: string | number, options?: { offset?: number }) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }
  }

  return { setLenis, scrollTo }
}
