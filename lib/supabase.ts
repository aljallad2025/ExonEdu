import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://lvuavitlifnfzdzdyzht.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dWF2aXRsaWZuZnpkemR5emh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NDQ2NTksImV4cCI6MjA4NDAyMDY1OX0.FXD7faLZBW6p2LOfyVypZOGcQ1BkFWjHwqTbkm7UyME';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
