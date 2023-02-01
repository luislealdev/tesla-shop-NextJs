// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    if (req.nextUrl.pathname.startsWith('/api/admin')) {
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const previousPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${previousPage}`;
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith('/admin')) {
    const validRoles = ['admin', 'super-user', 'SEO'];
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    const validRoles = ['admin', 'super-user', 'SEO'];
    if (!validRoles.includes(session.user.role)) {
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};