"use client"

import { useRef, useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export function Skills() {
  const [skillCategories, setSkillCategories] = useState<any[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const fetchSkills = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("skills").select("*").order("created_at", { ascending: true })

      if (data && data.length > 0) {
        const grouped = data.reduce((acc: any, skill: any) => {
          const category = skill.category
          if (!acc[category]) {
            acc[category] = {
              category,
              color: getColorForCategory(category),
              skills: [],
            }
          }
          acc[category].skills.push(skill.name)
          return acc
        }, {})

        setSkillCategories(Object.values(grouped))
      }
    }
    fetchSkills()
  }, [])

  const getColorForCategory = (category: string) => {
    const colors = [
      "bg-[#FFB5A7]", // Pastel Red/Pink
      "bg-[#FCD5CE]", // Pastel Peach
      "bg-[#F8EDEB]", // Off White
      "bg-[#FEC89A]", // Pastel Orange
    ]
    const hash = category.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  return (
    <section id="skills" className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32 bg-[#F9F7F2] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-[#E76F51]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#264653]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full border-2 border-black bg-[#E76F51] text-white font-bold text-sm tracking-wider uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-slide-in-left">
              My Toolkit
            </div>
            <h2
              className="text-5xl sm:text-7xl font-bold text-[#1a1a1a] font-serif leading-[0.9] animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              Skills & <br />
              <span className="italic text-[#E76F51]">Superpowers</span>
            </h2>
          </div>

          <p
            className="text-lg text-[#1a1a1a]/80 max-w-md font-medium animate-slide-in-right"
            style={{ animationDelay: "200ms" }}
          >
            Drag, toss, and play with the stickers below. A curated collection of my technical and creative arsenal.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative min-h-[600px] rounded-3xl border-4 border-black bg-white p-8 sm:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
        >
          {/* Grid Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {skillCategories.map((group, idx) => (
              <div key={idx} className="space-y-6">
                <h3
                  className="text-2xl font-bold text-[#1a1a1a] border-b-4 border-black pb-2 inline-block animate-fade-in"
                  style={{ animationDelay: `${100 * idx}ms` }}
                >
                  {group.category}
                </h3>

                <div className="flex flex-col gap-4 min-h-[200px]">
                  {group.skills.map((skill: string, i: number) => (
                    <SkillSticker key={i} skill={skill} color={group.color} index={i} containerRef={containerRef} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const SkillSticker = ({
  skill,
  color,
  index,
  containerRef,
}: { skill: string; color: string; index: number; containerRef: any }) => {
  const randomRotate = typeof window !== "undefined" ? Math.random() * 12 - 6 : 0

  return (
    <div
      className={`
        relative cursor-grab active:cursor-grabbing
        px-6 py-4 rounded-xl border-2 border-black
        ${color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        font-bold text-[#1a1a1a] text-center
        select-none transform-gpu
        hover:scale-110 hover:rotate-0 hover:z-50 transition-all duration-200
        animate-scale-in-rotate
      `}
      style={{
        transform: `rotate(${randomRotate}deg)`,
        animationDelay: `${index * 50}ms`,
      }}
    >
      {skill}
      {/* Shine effect */}
      <div className="absolute top-1 right-2 w-2 h-2 bg-white/40 rounded-full" />
    </div>
  )
}
