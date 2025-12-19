"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface TextInterludeProps {
  text: string
  textNative?: string
  language?: "jp" | "kr"
  layout?: "center" | "left" | "right"
  transitionType?: "words" | "lines" | "exposure" | "typewriter"
}

export function TextInterlude({ text, textNative, language = "jp", layout = "center", transitionType = "words" }: TextInterludeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const nativeRef = useRef<HTMLParagraphElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => setProgress(self.progress),
      })

      // Native text fade in first
      if (nativeRef.current) {
        gsap.fromTo(
          nativeRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 0.3,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
      // ... (text animation unchanged)
      // Text animation based on type
      if (textRef.current) {
        if (transitionType === "words") {
          const words = textRef.current.querySelectorAll(".word")
          gsap.fromTo(
            words,
            { opacity: 0.1, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.03,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "center center",
                scrub: true,
              },
            },
          )
        } else if (transitionType === "exposure") {
          gsap.fromTo(
            textRef.current,
            { opacity: 0, filter: "brightness(3) blur(4px)" },
            {
              opacity: 1,
              filter: "brightness(1) blur(0px)",
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            },
          )
        } else if (transitionType === "lines") {
          gsap.fromTo(
            textRef.current,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            },
          )
        }
      }
    }, containerRef)

    return () => ctx.revert()
  }, [transitionType])

  const alignmentClass = {
    center: "text-center items-center",
    left: "text-left items-start",
    right: "text-right items-end",
  }[layout]

  const renderTextWithWords = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="word inline-block mr-[0.3em]">
        {word}
      </span>
    ))
  }

  return (
    <section
      ref={containerRef}
      className={`relative min-h-[70vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32 md:py-40 bg-background ${alignmentClass}`}
    >
      {textNative && (
        <p
          ref={nativeRef}
          className={`${language === "kr" ? "text-korean" : "text-japanese-whisper"} text-foreground/20 tracking-[0.25em] mb-8 max-w-3xl`}
        >
          {textNative}
        </p>
      )}
      <div
        ref={textRef}
        className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground/80 leading-relaxed max-w-3xl"
      >
        {transitionType === "words" ? renderTextWithWords(text) : text}
      </div>

      {/* Decorative line */}
      <div
        className="mt-16 h-px bg-foreground/10"
        style={{
          width: `${Math.min(200, progress * 200)}px`,
          transition: "width 0.3s ease-out",
        }}
      />
    </section>
  )
}
