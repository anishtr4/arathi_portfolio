"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export function Hero() {
  const [heroContent, setHeroContent] = useState({
    title: "Creative Visual Designer",
    subtitle: "Crafting digital experiences with personality, precision, and a touch of the unexpected.",
    years_experience: 13,
  })
  const [showGame, setShowGame] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [contrast, setContrast] = useState(10)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const fetchHeroContent = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("hero_content").select("*").single()

      if (data) {
        setHeroContent(data)
      }
    }
    fetchHeroContent()
  }, [])

  const contrastRatio = (1 + (contrast / 100) * 20).toFixed(1)
  const isAccessible = Number.parseFloat(contrastRatio) >= 4.5

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!gameComplete) {
        setShowGame(true)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [gameComplete])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number.parseInt(e.target.value)
    setContrast(val)
    if (val >= 18 && !isSuccess) {
      setIsSuccess(true)
    }
  }

  const completeGame = () => {
    setGameComplete(true)
    setShowGame(false)
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {showGame && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in" onClick={completeGame} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 animate-scale-in-bounce">
            <div className="bg-[#FFF8E7] border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 relative overflow-hidden">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-accent/30 rotate-2 backdrop-blur-sm border border-black/10" />

              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-serif font-bold mb-2 flex items-center gap-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Visual Tuner
                  </h3>
                  <p className="text-sm font-mono text-muted-foreground">Fix the contrast to enter!</p>
                </div>
                <button
                  onClick={completeGame}
                  className="p-2 hover:bg-black/10 transition-colors rounded-full border-2 border-transparent hover:border-black"
                  aria-label="Skip game"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-8">
                <div
                  className="h-32 rounded-lg border-3 border-black flex items-center justify-center text-center p-4 transition-colors duration-100 relative"
                  style={{
                    backgroundColor: "#e5e5e5",
                    color: `rgba(0,0,0, ${contrast / 100})`,
                  }}
                >
                  <p className="text-2xl font-bold font-serif leading-tight">
                    "Accessibility is essential for some, but useful for all."
                  </p>

                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ opacity: 1 - contrast / 100 }}
                  >
                    <p className="text-sm font-mono text-black/20 uppercase tracking-widest">(Drag slider to reveal)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end font-mono">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase text-muted-foreground">Contrast Ratio</span>
                      <span className={`text-4xl font-bold ${isAccessible ? "text-green-600" : "text-red-500"}`}>
                        {contrastRatio}:1
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {isAccessible ? (
                        <span className="flex items-center gap-1 text-green-600 font-bold text-sm bg-green-100 px-2 py-1 rounded border border-green-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          AA PASS
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-500 font-bold text-sm bg-red-100 px-2 py-1 rounded border border-red-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          FAIL
                        </span>
                      )}
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={contrast}
                    onChange={handleSliderChange}
                    className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer border-2 border-black accent-black"
                    style={{
                      backgroundImage: `linear-gradient(to right, black ${contrast}%, transparent ${contrast}%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>Invisible</span>
                    <span>Readable</span>
                  </div>
                </div>

                {isAccessible && (
                  <div className="overflow-hidden">
                    <button
                      onClick={completeGame}
                      className="w-full py-4 bg-black text-white font-bold text-xl hover:bg-accent hover:text-black transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none"
                    >
                      ENTER PORTFOLIO →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="absolute top-20 left-0 w-full overflow-hidden opacity-10 pointer-events-none">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-[10rem] font-serif font-bold mx-4">PORTFOLIO</span>
          <span className="text-[10rem] font-serif font-bold mx-4 text-outline">PORTFOLIO</span>
          <span className="text-[10rem] font-serif font-bold mx-4">PORTFOLIO</span>
          <span className="text-[10rem] font-serif font-bold mx-4 text-outline">PORTFOLIO</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-block border border-foreground px-4 py-1 rounded-full animate-fade-in-up">
              <span className="font-mono text-sm tracking-widest uppercase">Available for work</span>
            </div>

            <h1
              className="text-7xl sm:text-8xl lg:text-9xl font-serif font-normal leading-[0.9] tracking-tight animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              {heroContent.title.split(" ").map((word, i) => (
                <span key={i}>
                  {i === 1 ? <span className="italic text-accent">{word}</span> : word}
                  {i < heroContent.title.split(" ").length - 1 && <br />}
                </span>
              ))}
            </h1>

            <p
              className="text-xl sm:text-2xl font-light max-w-lg animate-fade-in-up border-l-2 border-accent pl-6 py-2"
              style={{ animationDelay: "200ms" }}
            >
              {heroContent.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <button className="px-8 py-4 bg-foreground text-background text-lg font-medium rounded-none hover:bg-accent transition-colors duration-300 hover:skew-y-1">
                View Projects
              </button>
              <button className="px-8 py-4 border border-foreground text-foreground text-lg font-medium rounded-none hover:bg-foreground hover:text-background transition-colors duration-300">
                Contact Me
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[600px] hidden lg:block">
            <div
              className="absolute top-0 right-0 w-64 h-80 bg-secondary overflow-hidden border border-foreground animate-float"
              style={{ animationDelay: "0s" }}
            >
              <div className="absolute inset-0 bg-accent/10 mix-blend-multiply" />
              <div className="absolute bottom-4 left-4 font-mono text-xs">01. UI DESIGN</div>
            </div>

            <div
              className="absolute top-40 left-10 w-56 h-64 bg-accent overflow-hidden border border-foreground animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
              <div className="absolute bottom-4 left-4 font-mono text-xs text-white">02. BRANDING</div>
            </div>

            <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full border border-foreground flex items-center justify-center animate-spin-slow bg-background z-20">
              <div className="text-center">
                <div className="text-3xl font-bold">{heroContent.years_experience}+</div>
                <div className="text-xs font-mono uppercase">Years Exp.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-y border-foreground mt-20 bg-foreground text-background py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee-reverse">
          <span className="mx-8 font-mono uppercase tracking-widest">User Interface</span>
          <span className="mx-8 font-mono uppercase tracking-widest">•</span>
          <span className="mx-8 font-mono uppercase tracking-widest">User Experience</span>
          <span className="mx-8 font-mono uppercase tracking-widest">•</span>
          <span className="mx-8 font-mono uppercase tracking-widest">Design Systems</span>
          <span className="mx-8 font-mono uppercase tracking-widest">•</span>
          <span className="mx-8 font-mono uppercase tracking-widest">Art Direction</span>
          <span className="mx-8 font-mono uppercase tracking-widest">•</span>
          <span className="mx-8 font-mono uppercase tracking-widest">User Interface</span>
          <span className="mx-8 font-mono uppercase tracking-widest">•</span>
          <span className="mx-8 font-mono uppercase tracking-widest">User Experience</span>
          <span className="mx-8 font-mono uppercase tracking-widest">•</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleInBounce {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8) rotate(-5deg);
          }
          60% {
            transform: translate(-50%, -50%) scale(1.05) rotate(1deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s forwards;
        }

        .animate-scale-in-bounce {
          animation: scaleInBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 3s infinite;
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spinSlow 5s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          animation: marquee 10s linear infinite;
        }

        @keyframes marqueeReverse {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee-reverse {
          animation: marqueeReverse 10s linear infinite;
        }
      `}</style>
    </section>
  )
}
