export function Contact() {
  return (
    <section id="contact" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-6 mb-12 animate-fade-in-up">
          <p className="text-accent font-semibold text-sm tracking-wide uppercase">Get In Touch</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Let's work together
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hello, feel free to get in touch.
          </p>
        </div>

        <form className="space-y-4 glass-card rounded-xl p-8 animate-scale-in stagger-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              className="px-4 py-3 rounded-lg glass-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all hover:bg-white/10 dark:hover:bg-white/5"
            />
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-3 rounded-lg glass-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all hover:bg-white/10 dark:hover:bg-white/5"
            />
          </div>

          <input
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-3 rounded-lg glass-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all hover:bg-white/10 dark:hover:bg-white/5"
          />

          <textarea
            placeholder="Your message"
            rows={6}
            className="w-full px-4 py-3 rounded-lg glass-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all hover:bg-white/10 dark:hover:bg-white/5"
          />

          <button className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30 active:scale-95">
            Send Message
          </button>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fade-in-up stagger-3">
          <p className="text-muted-foreground">Or connect with me:</p>
          <div className="flex gap-4">
            <a href="#" className="p-3 rounded-lg glass-sm glass-hover hover-lift hover:text-primary transition-all">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#" className="p-3 rounded-lg glass-sm glass-hover hover-lift hover:text-primary transition-all">
              <span className="sr-only">Email</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
            <a href="#" className="p-3 rounded-lg glass-sm glass-hover hover-lift hover:text-primary transition-all">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-10 10v-2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
