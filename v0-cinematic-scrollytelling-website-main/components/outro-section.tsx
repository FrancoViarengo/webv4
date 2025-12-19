"use client"

import { motion } from "framer-motion"

export function OutroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background py-24">
      <div className="text-center px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-mono-metadata text-foreground/40 mb-8">END OF JOURNEY</p>

          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-editorial text-foreground mb-8">
            ありがとう
          </h2>

          <p className="text-xl md:text-2xl text-foreground/60 mb-4">Thank you for traveling with us.</p>

          <p className="text-base text-foreground/40 max-w-md mx-auto leading-relaxed">
            Japan awaits your footsteps. May your own journey be filled with wonder, quiet moments, and the beauty of
            impermanence.
          </p>

          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="w-12 h-12">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-foreground/30">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" />
                <circle cx="20" cy="20" r="6" fill="currentColor" />
              </svg>
            </div>
            <p className="text-mono-metadata text-foreground/30">NIHON 2024</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
