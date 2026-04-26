import { createClient } from '@supabase/supabase-js'

// Replace these with the actual values from the Supabase API page
const supabaseUrl = 'https://qaiytvcinysztktvmkyp.supabase.co'
const supabaseAnonKey = 'sb_publishable_qhn5vUCMcAfl1PnF7Q2xMQ_8wNT7E-Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)