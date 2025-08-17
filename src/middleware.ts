import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  // protect '/dashboard' (client will still rely on server 401 for API)
  if (url.pathname.startsWith('/dashboard')) {
    const hasCookie = req.cookies.get('sb_access_token');
    if (!hasCookie) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/app/:path*']
};
