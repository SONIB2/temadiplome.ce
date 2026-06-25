import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const SITE_CONFIG = {
  name: 'temadiplome.ce',
  whatsapp: '355684563585',
  whatsappDisplay: '+355 684 563 585',
  email: 'temadiplome.ce@gmail.com',
  instagram: 'temadiplome.ce',
  schedule: {
    weekdays: '09:00 - 18:00',
  },
}

export const formatPrice = (cents: number) => {
  const lek = Math.round(cents * 1.2)
  return `${lek.toLocaleString('sq-AL')} L`
}
