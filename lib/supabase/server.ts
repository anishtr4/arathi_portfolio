import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ""

  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ""

  // If no credentials, return a mock client to prevent crashes
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Supabase credentials not found, returning mock client")
    // Return a minimal mock that won't crash
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: new Error("No Supabase credentials") }),
      },
    } as any
  }

  const cookieStore = await cookies()

  // Get the auth token from cookies
  const authToken = cookieStore.get("sb-access-token")?.value

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: authToken
        ? {
            Authorization: `Bearer ${authToken}`,
          }
        : {},
    },
  })
}
