// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key exists:', !!supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ✅ Add this helper function to get the correct URL for any environment
export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your production URL in Vercel
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel
    'http://localhost:3000/'
  
  // Make sure to include `https://` when it's not localhost
  url = url.startsWith('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`
  url = url.endsWith('/') ? url : `${url}/`
  
  return url
}

// Test connection
supabase.from('events').select('count').then(result => {
  console.log('Connection test:', result)
})