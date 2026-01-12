"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export function Brands() {
  const [brands, setBrands] = useState<any[]>([])
  const [returnedBrands, setReturnedBrands] = useState<string[]>([])

  useEffect(() => {
    const fetchBrands = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("brands").select("*").order("created_at", { ascending: true })

      if (data && data.length > 0) {
        setBrands(data)
      }
    }
    fetchBrands()
  }, [])

  const handleBrandClick = (brandName: string) => {
    if (!returnedBrands.includes(brandName)) {
      setReturnedBrands([...returnedBrands, brandName])
    }
  }

  const handleReset = () => {
    setReturnedBrands([])
  }

  return (
    <section className="py-24 bg-[#F2F0E9] overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-4">Trusted By</h2>
            <p className="text-lg text-[#2D2D2D]/80 font-medium">From startups to tech giants</p>
          </div>

          <div className="relative flex flex-col items-center">
            <div
              className="relative z-20 mb-8 group cursor-pointer hover:scale-105 transition-transform animate-slide-down"
              onClick={handleReset}
            >
              <div className="absolute inset-0 -top-4 bg-[#E5D5B9] rounded-t-lg border-2 border-black transform scale-[0.95] -translate-y-2" />

              <div className="relative bg-[#F4E4C1] w-64 h-48 rounded-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center p-6 transition-transform active:scale-95">
                <div className="absolute -top-6 left-0 w-1/2 h-6 bg-[#F4E4C1] rounded-t-lg border-t-2 border-l-2 border-r-2 border-black" />

                <div className="relative">
                  <svg className="w-12 h-12 text-[#2D2D2D] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  {returnedBrands.length > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-black animate-scale-in">
                      {returnedBrands.length}
                    </div>
                  )}
                </div>

                <span className="font-serif text-lg font-bold text-[#2D2D2D] text-center">Client_Logos.zip</span>
                <div className="mt-2 text-xs font-mono bg-white/50 px-2 py-1 rounded border border-black/10 flex items-center gap-2">
                  {brands.length - returnedBrands.length} items spilled
                  {returnedBrands.length > 0 && (
                    <svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-3xl h-[400px] z-10">
              {brands.map((brand, index) => {
                const isReturned = returnedBrands.includes(brand.name)

                return (
                  <div
                    key={brand.id}
                    className={`absolute cursor-pointer transition-all duration-500 ${
                      isReturned
                        ? "opacity-0 -translate-y-48 scale-0"
                        : "opacity-100 scale-100 hover:scale-110 hover:z-30"
                    } animate-spill-out`}
                    style={{
                      left: `${(index % 3) * 30 + 10 + (Math.random() * 10 - 5)}%`,
                      top: `${Math.floor(index / 3) * 100 + 20 + Math.random() * 40}px`,
                      transform: `rotate(${Math.random() * 30 - 15}deg)`,
                      animationDelay: `${index * 150}ms`,
                      pointerEvents: isReturned ? "none" : "auto",
                    }}
                    onClick={() => handleBrandClick(brand.name)}
                  >
                    <div className="bg-white p-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                      <div className="relative w-32 h-12">
                        <Image
                          src={brand.logo_url || "/placeholder.svg"}
                          alt={`${brand.name} logo`}
                          fill
                          className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spillOut {
          from {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-spill-out {
          animation: spillOut 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .animate-slide-down {
          animation: slideDown 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
