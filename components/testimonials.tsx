"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [openEnvelope, setOpenEnvelope] = useState<number | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: true })

      if (data && data.length > 0) {
        const mappedData = data.map((testimonial) => ({
          quote: testimonial.content,
          author: testimonial.name,
          role: testimonial.role,
          company: testimonial.company,
        }))
        setTestimonials(mappedData)
      }
    }
    fetchTestimonials()
  }, [])

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative overflow-hidden bg-[#F5F1E8]">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-2 mb-16 text-center">
          <div className="inline-block animate-fade-in-up">
            <h2 className="font-serif text-6xl sm:text-7xl font-bold text-[#2D3319] mb-2">Fan Mail</h2>
            <p className="text-[#8B7355] text-lg">Click to open & read</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="relative animate-slide-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <div
                className={`relative cursor-pointer transition-all duration-200 ${openEnvelope === idx ? "scale-105" : "hover:scale-105"}`}
                onClick={() => setOpenEnvelope(openEnvelope === idx ? null : idx)}
              >
                {/* Envelope Body */}
                <div
                  className={`
                  relative bg-white border-4 border-[#2D3319] 
                  transition-all duration-300 overflow-hidden
                  ${openEnvelope === idx ? "shadow-[12px_12px_0px_0px_rgba(205,99,73,0.4)]" : "shadow-[8px_8px_0px_0px_rgba(45,51,25,1)]"}
                `}
                >
                  {/* Envelope Flap */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-32 bg-[#CD6349] border-b-4 border-[#2D3319] origin-top transition-transform duration-600`}
                    style={{
                      transformStyle: "preserve-3d",
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      transform: openEnvelope === idx ? "rotateX(-180deg)" : "rotateX(0deg)",
                    }}
                  >
                    {/* Stamp */}
                    <div className="absolute top-3 right-3 w-12 h-12 border-2 border-[#2D3319] bg-[#F5F1E8] flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-[#CD6349]"
                        fill="currentColor"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Letter Content */}
                  <div
                    className="relative p-6 pt-28 min-h-[320px] transition-transform duration-600"
                    style={{
                      transform: openEnvelope === idx ? "translateY(0)" : "translateY(20px)",
                    }}
                  >
                    {/* Closed State - Shows icon */}
                    {openEnvelope !== idx && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white">
                        <div className="text-center">
                          <svg
                            className="w-16 h-16 text-[#CD6349] mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-[#2D3319] font-semibold text-lg">From {testimonial.author}</p>
                          <p className="text-[#8B7355] text-sm">{testimonial.company}</p>
                        </div>
                      </div>
                    )}

                    {/* Open State - Shows testimonial */}
                    {openEnvelope === idx && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="flex justify-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="animate-scale-in" style={{ animationDelay: `${i * 100}ms` }}>
                              <svg
                                className="w-5 h-5 text-[#CD6349]"
                                fill="currentColor"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                            </div>
                          ))}
                        </div>

                        <p className="font-serif text-lg text-[#2D3319] leading-relaxed italic">
                          "{testimonial.quote}"
                        </p>

                        <div className="pt-4 border-t-2 border-[#2D3319] border-dashed">
                          <p className="font-bold text-[#2D3319] text-lg">{testimonial.author}</p>
                          <p className="text-sm text-[#8B7355]">{testimonial.role}</p>
                          <p className="text-sm text-[#8B7355]">{testimonial.company}</p>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-[#CD6349] text-sm font-semibold mt-4">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                            />
                          </svg>
                          <span>Click to close</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover indicator */}
                {openEnvelope !== idx && (
                  <div className="absolute -bottom-2 -right-2 bg-[#CD6349] text-white px-3 py-1 text-sm font-bold border-2 border-[#2D3319] rotate-3 hover:rotate-6 hover:scale-110 transition-transform">
                    OPEN ME!
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
