"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const StoryNode = ({ number, title }: { number: string; title: string }) => (
  <div className="flex flex-col items-center justify-center z-10 relative my-8">
    <div className="w-16 h-16 bg-background border-4 border-accent rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-2">
      <span className="text-2xl font-serif font-bold text-accent">{number}</span>
    </div>
    <div className="bg-accent text-background px-4 py-1 text-sm font-bold uppercase tracking-wider transform -rotate-2">
      {title}
    </div>
  </div>
)

const NarrativeBridge = ({ text }: { text: string }) => (
  <div className="flex justify-center my-12 relative z-10">
    <div className="bg-white border-2 border-foreground p-4 max-w-md text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transform rotate-1">
      <p className="font-serif italic text-lg text-foreground/80">"{text}"</p>
    </div>
  </div>
)

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sliderPositions, setSliderPositions] = useState<{ [key: number]: number }>({})

  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const fetchProject = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("projects").select("*").eq("id", params.id).single()

      if (data) {
        setProject(data)
        // Initialize slider positions
        const positions: { [key: number]: number } = {}
        if (data.before_after_designs) {
          data.before_after_designs.forEach((_: any, i: number) => {
            positions[i] = 50
          })
        }
        setSliderPositions(positions)
      }
      setLoading(false)
    }
    fetchProject()
  }, [params.id])

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scroll = `${totalScroll / windowHeight}`
      setScrollProgress(Number(scroll))
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSliderChange = (index: number, value: number) => {
    setSliderPositions((prev) => ({ ...prev, [index]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-2xl font-serif">Loading...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Project Not Found</h1>
          <Link href="/">
            <Button className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const tags = Array.isArray(project.tags) ? project.tags : []
  const dataInsights = project.data_insights || []
  const designVisuals = project.design_visuals || []
  const colorPalette = project.color_palette || []
  const typography = project.typography || {}
  const beforeAfterDesigns = project.before_after_designs || []
  const metrics = Array.isArray(project.metrics) ? project.metrics : []

  const getContent = (content: string | null) => {
    return (
      content ||
      "Content for this section is currently being updated. Check back soon for detailed insights and analysis."
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-foreground/10 -translate-x-1/2 z-0" />
      <div
        className="absolute left-4 md:left-1/2 top-0 w-1 bg-accent -translate-x-1/2 z-0 transition-all duration-100 ease-out"
        style={{ height: `${scrollProgress * 100}%` }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background z-10">
        {project.image_url ? (
          <div className="absolute inset-0 opacity-10">
            <Image src={project.image_url || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient || "from-blue-500 to-purple-500"} opacity-10`}
          />
        )}

        <Link href="/" className="absolute top-8 left-8 z-20">
          <button className="flex items-center gap-2 text-foreground hover:text-accent transition-colors font-bold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </Link>

        <div className="relative z-10 text-center px-4 max-w-6xl animate-fade-in-up bg-background/80 backdrop-blur-sm p-8 rounded-xl border-4 border-foreground/5">
          <div className="inline-block mb-4 px-4 py-1 bg-accent text-background font-bold uppercase tracking-widest text-sm transform -rotate-2">
            Chapter 1: The Spark
          </div>
          <h1 className="text-7xl md:text-9xl font-serif font-bold text-foreground mb-6">{project.title}</h1>
          <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-6 justify-center mt-12 text-sm font-bold">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} />
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} />
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} />
              </svg>
              <span>{project.year || "2024"}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>{project.my_role || "Lead Designer"}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
              </svg>
              <span>{project.category || "Product Design"}</span>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              {tags.map((tag: string, i: number) => (
                <span key={i} className="text-sm font-bold text-foreground/60 hover:text-accent transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <NarrativeBridge text="Every great story starts with a clear vision..." />

      {/* Project Overview - Paper Style */}
      <section className="py-20 relative z-10">
        <StoryNode number="01" title="The Vision" />
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="relative p-8 md:p-16 bg-[#fffdf0] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] transform rotate-1"
            style={{
              backgroundImage: "linear-gradient(#e5e5e5 1px, transparent 1px)",
              backgroundSize: "100% 32px",
            }}
          >
            {/* Paper holes */}
            <div className="absolute top-0 left-4 w-full h-8 flex gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-4 h-4 bg-background rounded-full border border-foreground/10 -mt-2" />
              ))}
            </div>

            {/* Red margin line */}
            <div className="absolute top-0 bottom-0 left-12 md:left-24 w-0.5 bg-red-300" />

            <div className="pl-8 md:pl-20 relative">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-8 flex items-center gap-3">
                Project Overview
              </h2>
              <p className="text-xl leading-loose text-foreground/80 font-serif" style={{ lineHeight: "32px" }}>
                {getContent(project.project_overview)}
              </p>
            </div>

            {/* Tape effect */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/80 rotate-2 shadow-sm" />
          </div>
        </div>
      </section>

      <NarrativeBridge text="But every vision faces its own set of puzzles..." />

      {/* The Challenge - Puzzle Style */}
      <section className="py-20 relative z-10">
        <StoryNode number="02" title="The Puzzle" />
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
              <div className="absolute -left-3 -top-3 w-full h-full border-4 border-accent -z-10" />
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">The Challenge</h2>
              <p className="text-lg leading-relaxed text-foreground/80">{getContent(project.challenge)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Jigsaw pieces with problem statements if available, or generic */}
              {["Complex User Flows", "Legacy Systems", "Tight Timeline", "Accessibility"].map((item, i) => (
                <div
                  key={i}
                  className="aspect-square bg-accent text-background p-4 flex items-center justify-center text-center font-bold text-sm md:text-base relative group cursor-pointer transition-transform hover:scale-105 hover:z-10"
                  style={{
                    clipPath:
                      i % 2 === 0
                        ? "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)"
                        : "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)",
                  }}
                >
                  <span className="group-hover:scale-110 transition-transform">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <NarrativeBridge text="To solve this, we went back to the drawing board..." />

      {/* User Research - Whiteboard Style */}
      <section className="py-20 relative z-10">
        <StoryNode number="03" title="The Discovery" />
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white border-8 border-gray-200 rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Whiteboard marker tray */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-4 bg-gray-300 rounded-t-lg border-t border-gray-400 flex justify-center gap-2 px-4 items-end">
              <div className="w-20 h-2 bg-red-500 rounded-full" />
              <div className="w-20 h-2 bg-blue-500 rounded-full" />
              <div className="w-20 h-2 bg-black rounded-full" />
            </div>

            <h2 className="text-4xl font-serif font-bold text-foreground mb-8 text-center">User Research & Insights</h2>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="font-handwriting text-2xl text-foreground/80 leading-relaxed transform -rotate-1">
                {getContent(project.user_research)}
              </div>

              {/* Sticky notes */}
              <div className="grid grid-cols-2 gap-4">
                {dataInsights.slice(0, 4).map((insight: any, i: number) => (
                  <div
                    key={i}
                    className={`p-4 shadow-md transform ${i % 2 === 0 ? "rotate-2 bg-yellow-200" : "-rotate-1 bg-pink-200"} transition-transform hover:scale-110 hover:z-10`}
                  >
                    <div className="w-8 h-2 bg-black/10 mb-2 mx-auto" />
                    <p className="font-handwriting text-sm font-bold text-foreground/80">
                      {insight.title || insight.description || "Key Insight"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats drawn on board */}
            <div className="flex justify-center gap-12 border-t-2 border-dashed border-gray-200 pt-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-foreground/80 font-handwriting">24</div>
                <div className="text-sm text-foreground/60 uppercase tracking-wider">Interviews</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-foreground/80 font-handwriting">156</div>
                <div className="text-sm text-foreground/60 uppercase tracking-wider">Surveys</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NarrativeBridge text="The insights illuminated our path forward..." />

      {/* Design Solution - Illuminated Circle */}
      <section className="py-20 relative z-10">
        <StoryNode number="04" title="The Idea" />
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="relative inline-block group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/40 transition-all duration-500" />

            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-background border-8 border-accent rounded-full flex flex-col items-center justify-center p-12 shadow-[0_0_50px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-500">
              <div className="mb-6 p-4 bg-accent rounded-full text-background">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">The Solution</h2>
              <p className="text-base md:text-lg leading-relaxed text-foreground/80 max-w-md">
                {getContent(project.design_solution)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <NarrativeBridge text="And the concept came to life..." />

      {/* Design Visuals - Isometric Grid */}
      {designVisuals.length > 0 && (
        <section className="py-20 relative z-10">
          <StoryNode number="05" title="The Build" />
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 perspective-1000">
              {designVisuals.map((visual: any, i: number) => (
                <div
                  key={i}
                  className="group relative transform transition-all duration-500 hover:-translate-y-4 hover:rotate-0"
                  style={{
                    transform: `rotateX(10deg) rotateY(-10deg) rotateZ(${i % 2 === 0 ? 2 : -2}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="absolute inset-0 bg-black/20 translate-y-4 translate-x-4 rounded-lg -z-10 group-hover:translate-y-8 group-hover:translate-x-8 transition-all duration-500" />
                  <div className="relative aspect-[4/3] bg-white rounded-lg overflow-hidden border-4 border-foreground/10 shadow-xl">
                    <Image
                      src={visual.url || "/placeholder.svg?height=600&width=800"}
                      alt={visual.caption || "Design Visual"}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white font-bold">{visual.caption || "Interface Design"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <NarrativeBridge text="Every pixel was chosen with purpose..." />

      {/* Design System - Typography & Colors */}
      {(Object.keys(typography).length > 0 || colorPalette.length > 0) && (
        <section className="py-20 relative z-10">
          <StoryNode number="06" title="The System" />
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Typography */}
              {Object.keys(typography).length > 0 && (
                <div className="bg-background border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    Typography
                  </h3>
                  <div className="space-y-8">
                    {typography.primary_font && (
                      <div>
                        <div className="text-sm font-bold text-foreground/60 uppercase tracking-wider mb-2">
                          Primary Font
                        </div>
                        <div className="text-5xl md:text-6xl font-bold text-foreground mb-2">Aa</div>
                        <div className="text-xl font-bold">{typography.primary_font}</div>
                        <div className="text-sm text-foreground/60">Headings & Titles</div>
                      </div>
                    )}
                    {typography.secondary_font && (
                      <div className="pt-6 border-t-2 border-foreground/10">
                        <div className="text-sm font-bold text-foreground/60 uppercase tracking-wider mb-2">
                          Secondary Font
                        </div>
                        <div className="text-4xl md:text-5xl text-foreground mb-2">Aa</div>
                        <div className="text-xl font-bold">{typography.secondary_font}</div>
                        <div className="text-sm text-foreground/60">Body & UI Text</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Color Palette */}
              {colorPalette.length > 0 && (
                <div className="bg-background border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                    Color Palette
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {colorPalette.map((color: any, i: number) => (
                      <div key={i} className="group">
                        <div
                          className="w-full aspect-square rounded-lg border-2 border-foreground/10 shadow-sm mb-2 transition-transform group-hover:scale-105"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="text-xs font-bold text-foreground uppercase">{color.hex}</div>
                        <div className="text-xs text-foreground/60">{color.name || "Color"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Design Evolution - Before/After */}
      {beforeAfterDesigns.length > 0 && (
        <section className="py-20 relative z-10">
          <StoryNode number="07" title="The Evolution" />
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-background border-4 border-foreground p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {beforeAfterDesigns.map((comparison: any, i: number) => (
                <div key={i} className="relative aspect-video overflow-hidden group">
                  <Image src={comparison.before_url || "/placeholder.svg"} alt="Before" fill className="object-cover" />
                  <div
                    className="absolute inset-0 border-r-4 border-accent bg-background"
                    style={{ width: `${sliderPositions[i] || 50}%` }}
                  >
                    <Image src={comparison.after_url || "/placeholder.svg"} alt="After" fill className="object-cover" />
                  </div>

                  {/* Slider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-transparent cursor-ew-resize z-20"
                    style={{ left: `${sliderPositions[i] || 50}%` }}
                  >
                    <div className="absolute top-1/2 -translate-x-1/2 w-12 h-12 bg-accent text-background rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
                      </svg>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPositions[i] || 50}
                    onChange={(e) => handleSliderChange(i, Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  />

                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 text-sm font-bold rounded">
                    BEFORE
                  </div>
                  <div className="absolute bottom-4 right-4 bg-accent text-background px-3 py-1 text-sm font-bold rounded">
                    AFTER
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <NarrativeBridge text="We mapped every step of the user's path..." />

      {/* User Journey - Roadmap Style */}
      <section className="py-20 relative z-10">
        <StoryNode number="08" title="The Journey" />
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative py-12">
            {/* Winding Road SVG */}
            <svg className="absolute top-0 left-0 w-full h-full -z-10 opacity-20" preserveAspectRatio="none">
              <path
                d="M100,50 C300,50 300,150 500,150 C700,150 700,50 900,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="10 10"
                className="hidden md:block"
              />
            </svg>

            <div className="grid md:grid-cols-4 gap-8">
              {["Discovery", "Onboarding", "Engagement", "Retention"].map((stage, i) => (
                <div
                  key={i}
                  className={`relative p-6 bg-white border-4 border-foreground rounded-lg shadow-lg transform transition-transform hover:-translate-y-2 ${i % 2 === 0 ? "md:translate-y-12" : "md:-translate-y-12"}`}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-accent text-background rounded-full flex items-center justify-center font-bold text-xl border-4 border-white">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold text-center mt-4 mb-2">{stage}</h3>
                  <p className="text-sm text-center text-foreground/70">
                    User enters the flow and begins their experience...
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center max-w-3xl mx-auto bg-white/80 backdrop-blur p-6 rounded-xl border-2 border-foreground/10">
              <p className="text-lg leading-relaxed">{getContent(project.user_flow)}</p>
            </div>
          </div>
        </div>
      </section>

      <NarrativeBridge text="The results spoke for themselves..." />

      {/* Results - Impact Dashboard Style */}
      <section className="py-20 relative z-10">
        <StoryNode number="09" title="The Impact" />
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-background border-4 border-foreground p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-foreground pb-8 mb-12 gap-6">
              <div>
                <h2 className="text-4xl font-serif font-bold text-foreground mb-2">Project Impact</h2>
                <p className="text-lg text-foreground/60">Key performance indicators and success metrics</p>
              </div>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-accent/10 border-2 border-accent rounded text-accent font-bold text-sm uppercase tracking-wider">
                  Verified Results
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {metrics.length > 0 ? (
                metrics.map((metric: string, i: number) => (
                  <div
                    key={i}
                    className="bg-foreground/5 p-6 rounded-lg border-2 border-foreground/10 relative overflow-hidden group hover:border-accent transition-colors"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 4" />
                      </svg>
                    </div>
                    <p className="text-lg font-bold text-foreground mb-4">{metric}</p>
                    <p className="text-sm text-foreground/70">Detailed explanation of the metric</p>
                  </div>
                ))
              ) : (
                <div className="bg-foreground/5 p-6 rounded-lg border-2 border-foreground/10 relative overflow-hidden group hover:border-accent transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 4" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-foreground mb-4">No Metrics Available</p>
                  <p className="text-sm text-foreground/70">This project does not have any metrics recorded.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
