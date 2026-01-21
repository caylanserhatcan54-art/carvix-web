import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aekayjppbxhkfccrnkyr.supabase.co'
// Buraya dikkat: .env içindeki değişken isminle aynı olmalı
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "" 

export const supabase = createClient(supabaseUrl, supabaseKey)