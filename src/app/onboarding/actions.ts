'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function saveOnboardingData(data: any) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name) { return cookieStore.get(name)?.value } } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Session expired' };

  // Atualiza o perfil e as preferências simultaneamente
  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: data.identity.name,
      role: data.identity.role,
      onboarding_completed: true
    })
    .eq('id', user.id);

  return { success: !error };
}