'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-bold tracking-tighter hover:text-accent transition-colors">
            DSGN<span className="text-accent">.</span>STD
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {['About', 'Work', 'Skills', 'Experience'].map((item) => (
              <Link 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="font-mono text-sm uppercase tracking-widest hover:text-accent transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link href="#contact" className="px-6 py-2 bg-foreground text-background font-mono text-sm uppercase tracking-widest hover:bg-accent transition-colors">
              Let's Talk
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:text-accent transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden py-6 border-t border-foreground/10 flex flex-col gap-4 bg-background">
            {['About', 'Work', 'Skills', 'Experience'].map((item) => (
              <Link 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="font-serif text-2xl hover:text-accent transition-colors px-2"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link 
              href="#contact" 
              className="mt-4 px-4 py-3 bg-foreground text-background text-center font-mono uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              Let's Talk
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
