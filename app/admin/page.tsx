import { redirect } from 'next/navigation';
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-serif text-5xl font-bold mb-2">Admin Panel</h1>
              <p className="text-muted">Manage your portfolio content</p>
            </div>
            <form action="/api/auth/logout" method="post">
              <Button 
                type="submit"
                variant="outline" 
                className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Logout
              </Button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/admin/hero">
            <div className="border-4 border-black p-6 bg-accent hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-serif text-3xl font-bold mb-2">Hero Section</h2>
              <p>Edit the hero title, subtitle, and experience</p>
            </div>
          </Link>

          <Link href="/admin/about">
            <div className="border-4 border-black p-6 bg-accent hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-serif text-3xl font-bold mb-2">About Me</h2>
              <p>Update your bio and introduction</p>
            </div>
          </Link>

          <Link href="/admin/projects">
            <div className="border-4 border-black p-6 bg-accent hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-serif text-3xl font-bold mb-2">Projects</h2>
              <p>Manage your digital playground projects</p>
            </div>
          </Link>

          <Link href="/admin/skills">
            <div className="border-4 border-black p-6 bg-accent hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-serif text-3xl font-bold mb-2">Skills</h2>
              <p>Edit your sticker sheet skills</p>
            </div>
          </Link>

          <Link href="/admin/experience">
            <div className="border-4 border-black p-6 bg-accent hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-serif text-3xl font-bold mb-2">Experience</h2>
              <p>Update your professional journey</p>
            </div>
          </Link>

          <Link href="/admin/testimonials">
            <div className="border-4 border-black p-6 bg-accent hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-serif text-3xl font-bold mb-2">Testimonials</h2>
              <p>Manage client testimonials</p>
            </div>
          </Link>

          <Link href="/admin/brands">
            <div className="border-4 border-black p-6 bg-accent hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-serif text-3xl font-bold mb-2">Brands</h2>
              <p>Update brands you've worked with</p>
            </div>
          </Link>

          <Link href="/">
            <div className="border-4 border-black p-6 bg-muted hover:bg-secondary transition-colors cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-serif text-3xl font-bold mb-2">View Site</h2>
              <p>Preview your portfolio website</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
