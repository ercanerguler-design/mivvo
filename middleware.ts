import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Admin yolları kontrolü
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (req.nextauth.token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Premium içerik kontrolü
    if (req.nextUrl.pathname.startsWith('/premium')) {
      if (req.nextauth.token.role !== 'PREMIUM' && req.nextauth.token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/upgrade', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
);

// Korumalı rotalar
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/premium/:path*',
    '/admin/:path*',
    '/api/premium/:path*',
    '/api/admin/:path*',
  ]
};