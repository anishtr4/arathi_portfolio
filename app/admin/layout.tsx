import { redirect } from 'next/navigation';
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <nav className="border-b-4 border-black bg-white shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/admin">
              <h1 className="font-serif text-3xl font-bold hover:text-primary transition-colors">
                Admin Panel
              </h1>
            </Link>
            <div className="flex gap-4 items-center">
              <Link href="/">
                <Button 
                  variant="outline" 
                  className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  View Site
                </Button>
              </Link>
              <form action="/api/auth/logout" method="post">
                <Button 
                  type="submit"
                  variant="outline" 
                  className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
