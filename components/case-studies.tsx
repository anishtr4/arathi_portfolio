"use client"

import { useRef, useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import Image from "next/image"

const PLACEHOLDER_PROJECTS = [
  {
    id: "1",
    title: "Project Alpha",
    description: "Innovative UI design for modern healthcare",
    category: "UI Design",
    gradient: "bg-gradient-to-br from-pink-500 to-rose-500",
    hasImage: false,
    metrics: ["User-Centered", "Accessible"],
    size: "md:col-span-2 md:row-span-2",
  },
  {
    id: "2",
    title: "Project Beta",
    description: "Research-driven design solutions",
    category: "UX Research",
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
    hasImage: false,
    metrics: ["Data-Driven", "Impact"],
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: "3",
    title: "Project Gamma",
    description: "Seamless development experience",
    category: "Development",
    gradient: "bg-gradient-to-br from-purple-500 to-indigo-500",
    hasImage: false,
    metrics: ["Scalable", "Modern"],
    size: "md:col-span-1 md:row-span-2",
  },
  {
    id: "4",
    title: "Project Delta",
    description: "Brand identity that resonates",
    category: "Branding",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-500",
    hasImage: false,
    metrics: ["Memorable", "Bold"],
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: "5",
    title: "Project Epsilon",
    description: "Strategic design thinking",
    category: "Strategy",
    gradient: "bg-gradient-to-br from-orange-500 to-amber-500",
    hasImage: false,
    metrics: ["Business Value", "Innovation"],
    size: "md:col-span-2 md:row-span-1",
  },
]

const GRADIENTS = [
  "bg-gradient-to-br from-pink-500 to-rose-500",
  "bg-gradient-to-br from-blue-500 to-cyan-500",
  "bg-gradient-to-br from-purple-500 to-indigo-500",
  "bg-gradient-to-br from-green-500 to-emerald-500",
  "bg-gradient-to-br from-orange-500 to-amber-500",
]

export function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<any[]>(PLACEHOLDER_PROJECTS)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    const fetchProjects = async () => {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        if (!supabaseUrl) {
          // No Supabase configured, use placeholders
          setIsLoading(false)
          return
        }

        const supabase = createClient()

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Request timeout")), 5000)
        })

        const fetchPromise = supabase
          .from("projects")
          .select("*")
          .eq("is_draft", false)
          .order("order_index", { ascending: true })

        const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any

        if (!isMounted) return

        if (error) {
          console.warn("[v0] Supabase error, using placeholders:", error.message)
          setIsLoading(false)
          return
        }

        if (data && data.length > 0) {
          const mappedData = data.map((project: any, index: number) => ({
            id: project.id,
            title: project.title || "Untitled Project",
            description: project.description || "Project description coming soon",
            category: project.category || "Featured Work",
            image: project.image_url,
            gradient: project.gradient || GRADIENTS[index % GRADIENTS.length],
            hasImage: !!project.image_url,
            metrics: Array.isArray(project.metrics)
              ? project.metrics
              : typeof project.metrics === "string"
                ? project.metrics.split(",").map((m: string) => m.trim())
                : [],
            size:
              index === 0
                ? "md:col-span-2 md:row-span-2"
                : index === 2
                  ? "md:col-span-1 md:row-span-2"
                  : index === 4
                    ? "md:col-span-2 md:row-span-1"
                    : "md:col-span-1 md:row-span-1",
          }))
          setCaseStudies(mappedData)
        }
        setIsLoading(false)
      } catch (error: any) {
        console.warn("[v0] Using placeholder projects due to:", error?.message || "unknown error")
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchProjects()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id="work" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 animate-slide-in-left">
              <span className="h-px w-8 bg-accent"></span>
              <p className="text-accent font-bold tracking-widest uppercase text-sm">Selected Works</p>
            </div>

            <h2
              className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-[0.9] animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              Digital <br />
              <span className="italic text-muted-foreground">Playground</span>
            </h2>
          </div>

          <div className="hidden md:block animate-float-slow">
            <div className="w-24 h-24 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 auto-rows-[240px] grid-flow-dense">
          {caseStudies.map((study, idx) => (
            <Card key={study.id} study={study} index={idx} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float-slow {
          animation: floatSlow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

function Card({ study, index }: { study: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/projects/${study.id}`}>
      <div
        className={`group relative overflow-hidden border-4 border-black bg-card ${study.size} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer animate-fade-in-up hover:-translate-y-1`}
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {study.hasImage && study.image ? (
          <div className="absolute inset-0 bg-gray-200">
            <Image
              src={study.image || "/placeholder.svg"}
              alt={study.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              unoptimized
            />
          </div>
        ) : (
          <div
            className={`absolute inset-0 ${study.gradient || "bg-gradient-to-br from-pink-500 to-rose-500"} transition-transform duration-700 ease-out group-hover:scale-110`}
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

        {/* Content Container */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 bg-white text-black text-xs font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 group-hover:rotate-0 transition-transform">
              {study.category}
            </span>
            <div
              className={`w-12 h-12 bg-accent border-2 border-black text-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${
                isHovered ? "scale-100 opacity-100 rotate-12" : "scale-0 opacity-0 rotate-0"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

          <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
            <h3
              className="text-3xl md:text-4xl font-serif font-bold mb-2 leading-none text-white"
              style={{
                textShadow:
                  "3px 3px 0px rgba(0,0,0,0.8), -1px -1px 0px rgba(0,0,0,0.8), 1px -1px 0px rgba(0,0,0,0.8), -1px 1px 0px rgba(0,0,0,0.8)",
              }}
            >
              {study.title}
            </h3>
            <p
              className="text-white font-semibold text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
            >
              {study.description}
            </p>

            <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              {study.metrics.slice(0, 3).map((metric: string, i: number) => (
                <span
                  key={i}
                  className="text-xs font-bold px-2 py-1 bg-yellow-300 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
