"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Eye, EyeOff } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo only - would connect to real auth
    console.log("[v0] Auth submit:", { mode, email, password, name })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Backdrop with exposure flash */}
          <motion.div
            className="absolute inset-0 bg-foreground"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md mx-4 p-8 md:p-12 border border-foreground/10 bg-background/80 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-foreground/40 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-editorial">
                {mode === "login" ? "Welcome Back" : "Join the Journey"}
              </h2>
              <p className="text-japanese-echo text-foreground/30 mt-2">
                {mode === "login" ? "お帰りなさい" : "旅に参加する"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === "register" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block">
                    <span className="hud-element text-foreground/50 mb-2 block">Name</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:border-foreground/50 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </label>
                </motion.div>
              )}

              <div>
                <label className="block">
                  <span className="hud-element text-foreground/50 mb-2 block">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:border-foreground/50 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </label>
              </div>

              <div>
                <label className="block">
                  <span className="hud-element text-foreground/50 mb-2 block">Password</span>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:border-foreground/50 focus:outline-none transition-colors pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-foreground/40 hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-4 border border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all duration-500 flex items-center justify-center gap-3 group"
              >
                <span className="hud-element">{mode === "login" ? "Continue Journey" : "Begin Journey"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Toggle mode */}
            <div className="mt-8 text-center">
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="hud-element text-foreground/40 hover:text-foreground transition-colors"
              >
                {mode === "login" ? "Create an account" : "Already have an account?"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
