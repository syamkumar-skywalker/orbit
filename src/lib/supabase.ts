import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Conditional export: only create client if env vars exist
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export const isLocalMode = !supabase

if (isLocalMode) {
    console.warn("Orbit is running in Local Mode (Missing Supabase Credentials). Realtime features will be disabled.")
}
