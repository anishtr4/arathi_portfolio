"use client"

import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"

export function About() {
  const [bio, setBio] = useState(
    "With over 13 years of experience in UI/UX design, I've dedicated my career to creating digital products that are not just beautiful, but meaningful and intuitive. My approach blends strategic thinking with creative execution.",
  )
  const [imageUrl, setImageUrl] = useState("/professional-designer-portrait.png")

  useEffect(() => {
    const fetchAboutContent = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("about_content").select("*").single()

      if (data) {
        setBio(data.bio)
        if (data.image_url) {
          setImageUrl(data.image_url)
        }
      }
    }
    fetchAboutContent()
  }, [])

  return (
    <section id="about" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground mb-4">About Me</h2>
          <div className="inline-block px-6 py-2 bg-accent text-background font-bold text-sm tracking-wider rotate-[-2deg] border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            THE STORY SO FAR...
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 justify-center">
          <div className="relative flex-shrink-0 animate-scale-in-rotate">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border-8 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-primary via-accent to-secondary overflow-hidden relative group">
              <img src={imageUrl || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="absolute -top-4 -right-4 bg-secondary border-4 border-foreground px-4 py-2 rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-wobble">
              <span className="font-bold text-sm">13+ YEARS</span>
            </div>

            <div
              className="absolute -bottom-4 -left-4 bg-accent border-4 border-foreground px-4 py-2 -rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-wobble"
              style={{ animationDelay: "0.5s" }}
            >
              <span className="font-bold text-sm">UI/UX PRO</span>
            </div>
          </div>

          <div className="relative max-w-2xl animate-slide-in-left" style={{ animationDelay: "200ms" }}>
            <div className="bg-card border-8 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-10 rounded-3xl">
              <div className="space-y-6">
                <p
                  className="text-lg sm:text-xl text-foreground leading-relaxed animate-fade-in"
                  style={{ animationDelay: "400ms" }}
                >
                  <span className="font-serif text-3xl text-primary">"</span>
                  {bio}
                  <span className="font-serif text-3xl text-primary">"</span>
                </p>

                <p
                  className="text-lg text-muted-foreground leading-relaxed animate-fade-in"
                  style={{ animationDelay: "500ms" }}
                >
                  I specialize in designing comprehensive design systems that scale across complex products, conducting
                  user research that informs better decisions, and leading cross-functional teams to deliver exceptional
                  results.
                </p>

                <p
                  className="text-lg text-muted-foreground leading-relaxed animate-fade-in"
                  style={{ animationDelay: "600ms" }}
                >
                  My work spans startups to Fortune 500 companies, where I've driven product innovation, improved user
                  satisfaction, and built design-forward cultures. I believe great design is invisible—it solves
                  problems elegantly.
                </p>

                <div className="flex flex-wrap gap-3 pt-4 animate-fade-in-up" style={{ animationDelay: "700ms" }}>
                  {["User-Centered", "Systems Thinking", "Design Leadership", "Problem Solver"].map((badge, index) => (
                    <div
                      key={badge}
                      className="px-4 py-2 bg-accent/20 border-3 border-foreground rounded-full font-bold text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:scale-110 hover:bg-accent hover:text-background transition-all"
                      style={{ transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (index + 1)}deg)` }}
                    >
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wobble {
          0%, 100% {
            transform: rotate(12deg);
          }
          50% {
            transform: rotate(18deg);
          }
        }

        @keyframes wobbleReverse {
          0%, 100% {
            transform: rotate(-12deg);
          }
          50% {
            transform: rotate(-18deg);
          }
        }

        @keyframes scaleInRotate {
          from {
            opacity: 0;
            transform: scale(0.8) rotate(-10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        .animate-wobble {
          animation: wobble 2s ease-in-out infinite;
        }

        .animate-scale-in-rotate {
          animation: scaleInRotate 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
