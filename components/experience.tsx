"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export function Experience() {
  const [experiences, setExperiences] = useState<any[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetchExperiences = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("experience").select("*").order("created_at", { ascending: true })

      if (data && data.length > 0) {
        const mappedData = data.map((exp, index) => ({
          company: exp.company,
          role: exp.role,
          period: exp.duration, // mapped from duration to period
          location: "Remote", // Default location
          description: exp.description,
          achievements: Array.isArray(exp.achievements)
            ? exp.achievements
            : typeof exp.achievements === "string"
              ? exp.achievements.split(",").map((a: string) => a.trim())
              : [],
          color: index === 0 ? "bg-accent" : index === 1 ? "bg-primary" : "bg-secondary",
        }))
        setExperiences(mappedData)
      }
    }
    fetchExperiences()
  }, [])

  return (
    <section id="experience" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-6xl font-serif mb-4">Journey Timeline</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click on any milestone to explore the details of my professional adventure
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-primary to-secondary hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const isActive = activeIndex === index
              const isHovered = hoveredIndex === index

              return (
                <div
                  key={index}
                  className="relative animate-slide-in-left"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div
                    className={`absolute left-8 w-8 h-8 rounded-full border-4 border-background ${exp.color} hidden md:block z-10 -translate-x-1/2 transition-all duration-300 ${
                      isActive ? "scale-150 rotate-180" : isHovered ? "scale-120" : "scale-100"
                    }`}
                    style={{
                      opacity: isActive ? 1 : 0.8,
                    }}
                  >
                    <div
                      className={`absolute inset-0 rounded-full bg-current ${isActive ? "animate-pulse-glow" : ""}`}
                    />
                  </div>

                  <div
                    className="md:ml-24 cursor-pointer transition-transform duration-200 hover:translate-x-2"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setActiveIndex(isActive ? null : index)}
                  >
                    <div
                      className={`border-4 border-foreground bg-background p-6 transition-all duration-300 ${
                        isActive ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      }`}
                      style={{
                        borderColor: isActive || isHovered ? "var(--accent)" : "var(--foreground)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3
                            className="text-3xl font-serif mb-2 transition-colors"
                            style={{
                              color: isActive || isHovered ? "var(--accent)" : "var(--foreground)",
                            }}
                          >
                            {exp.company}
                          </h3>
                          <h4 className="text-xl font-medium mb-3">{exp.role}</h4>

                          <div className="flex flex-wrap gap-3 text-sm">
                            <span className="flex items-center gap-1 font-mono bg-foreground text-background px-3 py-1 rounded-full">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
                                <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} />
                                <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} />
                                <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} />
                              </svg>
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1 font-mono bg-secondary text-foreground px-3 py-1 rounded-full border-2 border-foreground">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        <div
                          className="transition-transform duration-200"
                          style={{
                            transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{exp.description}</p>

                      {isActive && (
                        <div className="overflow-hidden animate-expand">
                          <div className="pt-4 border-t-2 border-dashed border-foreground/20 mt-4">
                            <h5 className="font-serif text-xl mb-3 flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              Key Achievements
                            </h5>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement: string, i: number) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 animate-slide-in-left"
                                  style={{ animationDelay: `${i * 100}ms` }}
                                >
                                  <span
                                    className={`${exp.color} w-2 h-2 rounded-full mt-2 flex-shrink-0 animate-pulse-slow`}
                                  />
                                  <span className="text-foreground">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes expand {
          from {
            max-height: 0;
            opacity: 0;
          }
          to {
            max-height: 500px;
            opacity: 1;
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-expand {
          animation: expand 0.3s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulseSlow 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
