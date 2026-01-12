import { createClient as createSupabaseClient } from "@supabase/supabase-js"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ""

  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ""

  // If no credentials, return a mock client to prevent crashes
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Supabase credentials not found in client")

    const mockBuilder = {
      select: () => mockBuilder,
      eq: () => mockBuilder,
      single: () => Promise.resolve({ data: null, error: new Error("No Supabase credentials") }),
      order: () => mockBuilder,
      limit: () => mockBuilder,
      insert: () => Promise.resolve({ data: null, error: new Error("No Supabase credentials") }),
      update: () => Promise.resolve({ data: null, error: new Error("No Supabase credentials") }),
      delete: () => Promise.resolve({ data: null, error: new Error("No Supabase credentials") }),
      then: (resolve: any) => resolve({ data: [], error: null }),
    }

    // Return a minimal mock that won't crash
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: new Error("No Supabase credentials") }),
        signInWithPassword: async () => ({ data: null, error: new Error("No Supabase credentials") }),
        signUp: async () => ({ data: null, error: new Error("No Supabase credentials") }),
        signOut: async () => ({ error: new Error("No Supabase credentials") }),
      },
      from: () => mockBuilder,
      storage: {
        from: () => ({
          upload: async () => ({ data: null, error: new Error("No Supabase credentials") }),
          getPublicUrl: () => ({ data: { publicUrl: "" } }),
        }),
      },
    } as any
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
