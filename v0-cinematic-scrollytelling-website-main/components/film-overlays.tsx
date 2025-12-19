"use client"

import { useEffect, useState } from "react"

export function FilmGrain() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  // Replaced grain with a simple dark overlay as requested (kept from previous step)
  return <div className="fixed inset-0 pointer-events-none z-[100] bg-black/10 mix-blend-multiply" aria-hidden="true" />
}

export function Vignette() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[90]"
      style={{
        background: 'radial-gradient(circle, transparent 50%, rgba(20,15,10,0.4) 120%)'
      }}
      aria-hidden="true"
    />
  )
}

export function Scratches() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[95] overflow-hidden opacity-30 mix-blend-screen">
      <style jsx>{`
        @keyframes scratch-anim {
          0% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-10px) translateY(5px); }
          20% { transform: translateX(5px) translateY(-5px); }
          30% { transform: translateX(-5px) translateY(10px); }
          40% { transform: translateX(10px) translateY(-10px); }
          50% { transform: translateX(-10px) translateY(5px); }
          60% { transform: translateX(5px) translateY(-5px); }
          70% { transform: translateX(-5px) translateY(10px); }
          80% { transform: translateX(10px) translateY(-10px); }
          90% { transform: translateX(-10px) translateY(5px); }
          100% { transform: translateX(0) translateY(0); }
        }
        .scratch {
          position: absolute;
          width: 2px;
          height: 100px;
          background: rgba(255, 235, 200, 0.4);
          animation: scratch-anim 0.5s infinite steps(1);
        }
      `}</style>
      {/* Random scratches simulation */}
      <div className="scratch" style={{ top: '10%', left: '20%', transform: 'rotate(10deg)' }}></div>
      <div className="scratch" style={{ top: '30%', left: '60%', height: '50px', transform: 'rotate(-5deg)', animationDelay: '0.1s' }}></div>
      <div className="scratch" style={{ top: '70%', left: '40%', height: '80px', transform: 'rotate(2deg)', animationDelay: '0.3s' }}></div>
      <div className="scratch" style={{ top: '50%', left: '80%', height: '120px', transform: 'rotate(-2deg)', animationDelay: '0.2s' }}></div>
    </div>
  )
}
