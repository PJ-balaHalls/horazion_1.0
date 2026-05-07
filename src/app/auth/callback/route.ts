import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Troca o código pela sessão do utilizador
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Após a confirmação, enviamos o utilizador para o Onboarding
  // "Simple na superfície. Extremamente preciso por baixo."
  return NextResponse.redirect(`${requestUrl.origin}/onboarding`);
}