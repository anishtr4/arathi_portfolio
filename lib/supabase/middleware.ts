import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  // If Supabase is not configured, skip auth checks
  if (!supabaseUrl || !supabaseKey) {
    console.warn("[v0] Supabase environment variables not found in middleware")
    return supabaseResponse
  }

  try {
    // Get auth token from cookies
    const authToken = request.cookies.get("sb-access-token")?.value

    const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
      global: {
        headers: authToken
          ? {
              Authorization: `Bearer ${authToken}`,
            }
          : {},
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Protect admin routes
    if (request.nextUrl.pathname.startsWith("/admin") && !user) {
      const url = request.nextUrl.clone()
      url.pathname = "/auth/login"
      return NextResponse.redirect(url)
    }
  } catch (error) {
    console.error("[v0] Middleware auth error:", error)
  }

  return supabaseResponse
}
