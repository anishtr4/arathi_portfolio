export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h4 className="font-mono text-accent mb-6 uppercase tracking-widest">Get in touch</h4>
            <a href="mailto:hello@designstudio.com" className="text-3xl sm:text-5xl font-serif hover:text-accent transition-colors block mb-2">
              hello@design.studio
            </a>
            <p className="text-white/60 max-w-md mt-6 font-light">
              Available for freelance projects and open to full-time opportunities.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono text-accent mb-6 uppercase tracking-widest">Socials</h4>
              <ul className="space-y-4">
                {['LinkedIn', 'Dribbble', 'Twitter', 'Instagram'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xl hover:text-accent transition-colors hover:translate-x-2 inline-block duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-accent mb-6 uppercase tracking-widest">Sitemap</h4>
              <ul className="space-y-4">
                {['Home', 'Work', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xl hover:text-accent transition-colors hover:translate-x-2 inline-block duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Large Footer Logo */}
        <div className="border-t border-white/10 pt-10">
          <h2 className="text-[12vw] leading-none font-serif font-bold text-center opacity-20 select-none">
            DESIGN STUDIO
          </h2>
          <div className="flex justify-between items-center mt-8 text-sm font-mono text-white/40">
            <p>© 2025 Design Studio</p>
            <p>Made with v0</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
