import { createClient } from '@supabase/supabase-js';

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)
  || 'https://etynmcwfrfndesrpudmk.supabase.co';

const key = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined)
  || 'sb_publishable_SiQpDLTr5EsfIOjXlTyH5w_8ms42imP';

export const supabase = createClient(url, key);