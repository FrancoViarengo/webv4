"use client"

import { useCallback, useRef, useState } from "react"
import type Lenis from "lenis"
import { LenisProvider } from "@/components/lenis-provider"
import { FilmGrain, Vignette, Scratches } from "@/components/film-overlays"
import { HUDNavbar } from "@/components/hud-navbar"
import { IntroSection } from "@/components/intro-section"
import { HeroChapter } from "@/components/hero-chapter"
import { OutroSection } from "@/components/outro-section"
import { VideoInterlude } from "@/components/video-interlude"
import { GallerySection } from "@/components/gallery-section"
import { SplitParallax } from "@/components/split-parallax"
import { HorizontalScrollGallery } from "@/components/horizontal-scroll-gallery"
import { TextInterlude } from "@/components/text-interlude"
import { SilentSection } from "@/components/silent-section"
import { AuthModal } from "@/components/auth-modal"
import { MusicPlayer } from "@/components/music-player"
import { chapters } from "@/lib/chapters-data"

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [currentChapter, setCurrentChapter] = useState(1)

  const handleLenisReady = useCallback((lenis: Lenis) => {
    lenisRef.current = lenis
  }, [])

  const handleNavigate = useCallback((chapterId: string) => {
    const element = document.getElementById(chapterId)
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        offset: 0,
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }
  }, [])

  return (
    <LenisProvider onLenisReady={handleLenisReady}>
      <FilmGrain />{/* This is now the dark overlay */}
      <Vignette />
      <Scratches />
      <div className="scanlines opacity-50 mix-blend-overlay" />

      <HUDNavbar onNavigate={handleNavigate} onOpenAuth={() => setIsAuthOpen(true)} currentChapter={currentChapter} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <MusicPlayer />

      <main id="main-content" className="pb-20">
        <IntroSection />

        {/* Chapter 1: Tokyo Night (Japan) - Dissolve transition */}
        <HeroChapter chapter={chapters[0]} isFirst transitionType="dissolve" />



        <VideoInterlude
          videoSrc="/videos/japanrain.mp4"
          posterSrc="/placeholder.svg?height=1080&width=1920"
          quote="In Tokyo, even the rain glows."
          quoteNative="東京では、雨さえも光る"
          language="jp"
          author="Anonymous Traveler"
          transitionType="exposure"
        />

        {/* Chapter 2: Seoul Pulse (Korea) - Wipe transition */}
        <HeroChapter chapter={chapters[1]} transitionType="wipe" />

        <SplitParallax
          leftImage="/placeholder.svg?height=800&width=600"
          rightImage="/placeholder.svg?height=800&width=600"
          leftAlt="Seoul Palace"
          rightAlt="Modern Architecture"
          caption="Between the dynastic past and the neon future, a new rhythm emerges."
          captionNative="왕조의 과거와 네온의 미래 사이에서 새로운 리듬이 피어난다"
        />

        {/* Silent section - just video, almost no content */}
        <SilentSection posterSrc="/placeholder.svg?height=1080&width=1920" duration="medium" />

        {/* Chapter 3: Kyoto Zen (Japan) - Exposure flash transition */}
        <HeroChapter chapter={chapters[2]} transitionType="exposure" />

        <TextInterlude
          text="Kyoto is not a city of monuments, but of moments. The falling leaf, the raked sand, the silence that is louder than words."
          textNative="京都は記念碑の街ではなく、瞬間の街だ。落ち葉、熊手で掃かれた砂、言葉よりも大きな沈黙"
          language="jp"
          layout="center"
          transitionType="words"
        />

        <GallerySection
          title="MOMENTS"
          titleNative="瞬間"
          transitionType="cascade"
          images={[
            {
              src: "/placeholder.svg?height=600&width=400",
              alt: "Kyoto Temple",
              aspectRatio: "portrait",
            },
            {
              src: "/placeholder.svg?height=400&width=600",
              alt: "Cherry blossoms",
              aspectRatio: "landscape",
            },
            {
              src: "/placeholder.svg?height=400&width=400",
              alt: "Tea ceremony",
              aspectRatio: "square",
            },
            {
              src: "/placeholder.svg?height=400&width=400",
              alt: "Garden stones",
              aspectRatio: "square",
            },
            {
              src: "/placeholder.svg?height=600&width=400",
              alt: "Torii gate path",
              aspectRatio: "portrait",
            },
            {
              src: "/placeholder.svg?height=400&width=600",
              alt: "Shinkansen",
              aspectRatio: "landscape",
            },
          ]}
        />

        {/* Chapter 4: Jeju Wind (Korea) - Soft transition */}
        <HeroChapter chapter={chapters[3]} transitionType="soft" />

        {/* Long silent section for contemplation */}
        <SilentSection
          posterSrc="/placeholder.svg?height=1080&width=1920"
          duration="long"
          ambientText="Yeoyu — the freedom of mind and space."
          ambientTextNative="여유"
          language="kr"
        />

        <TextInterlude
          text="The wind on Jeju carries the scent of the sea and the weight of history. Here, nature is the only true architect."
          textNative="제주의 바람은 바다의 향기와 역사의 무게를 싣고 온다. 이곳에서 자연은 유일한 진정한 건축가이다"
          language="kr"
          layout="center"
          transitionType="exposure"
        />

        {/* Chapter 5: Sapporo Winter (Japan) - Diagonal transition */}
        <HeroChapter chapter={chapters[4]} transitionType="diagonal" />

        <VideoInterlude
          videoSrc="/placeholder.svg?height=1080&width=1920"
          posterSrc="/placeholder.svg?height=1080&width=1920"
          quote="Winter doesn't ask permission. It simply arrives, and in its quietness, reveals what summer hides."
          quoteNative="冬は許可を求めない。ただ訪れ、その静けさの中で、夏が隠すものを明らかにする"
          language="jp"
          transitionType="wipe"
        />

        <HorizontalScrollGallery
          title="WINTER TALES"
          titleNative="冬の物語"
          images={[
            {
              src: "/placeholder.svg?height=800&width=1200",
              alt: "Snow festival sculpture",
              caption: "Sapporo Yuki Matsuri — where ice becomes art",
            },
            {
              src: "/placeholder.svg?height=800&width=1200",
              alt: "Deer in winter forest",
              caption: "Wildlife emerges in the Hokkaido silence",
            },
            {
              src: "/placeholder.svg?height=800&width=1200",
              alt: "Restaurant in snow",
              caption: "Warmth glows through frosted windows",
            },
            {
              src: "/placeholder.svg?height=800&width=1200",
              alt: "Powder snow slopes",
              caption: "Niseko's legendary powder awaits",
            },
            {
              src: "/placeholder.svg?height=800&width=1200",
              alt: "Otaru canal",
              caption: "Otaru Canal at twilight",
            },
          ]}
        />

        {/* Silent breathing space */}
        <SilentSection posterSrc="/placeholder.svg?height=1080&width=1920" duration="short" />

        {/* Chapter 6: Gyeongju (Korea) - Wipe transition */}
        <HeroChapter chapter={chapters[5]} transitionType="wipe" />

        <SplitParallax
          leftImage="/placeholder.svg?height=800&width=600"
          rightImage="/placeholder.svg?height=800&width=600"
          leftAlt="Tumuli Park"
          rightAlt="Cheomseongdae"
          caption="The silence of kings echoes through the grassy mounds."
          captionNative="왕들의 침묵이 풀 덮인 언덕 사이로 메아리친다"
        />

        <TextInterlude
          text="To walk here is to tread on time itself. The past is not buried; it is planted, growing green with memory."
          textNative="이곳을 걷는 것은 시간 위를 걷는 것이다. 과거는 묻힌 것이 아니라, 기억과 함께 푸르게 자라난다"
          language="kr"
          layout="left"
          transitionType="lines"
        />

        {/* Final silent contemplation */}
        <SilentSection
          posterSrc="/placeholder.svg?height=1080&width=1920"
          duration="medium"
          ambientText="Every ending is merely a pause before the next beginning."
          ambientTextNative="모든 끝은 다음 시작을 위한 멈춤일 뿐이다"
          language="kr"
        />

        <OutroSection />
      </main>
    </LenisProvider>
  )
}
