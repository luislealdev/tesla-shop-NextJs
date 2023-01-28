// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server'

//  import * as jose from 'jose';

export async function middleware(req: NextRequest) {


  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const previousPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${previousPage}`;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();


  //  WITH OUR CUSTOM AUTH
  //  if (previousPage.startsWith('/checkout')) {
  //    const token = req.cookies.get('token')?.value || '';

  //    try {
  //      await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
  //      return NextResponse.next();
  //    } catch (error) {
  //      return NextResponse.redirect(
  //        new URL(`/auth/login?p=${previousPage}`, req.url)
  //      );
  //    }
  //  }
};

export const config = {
  matcher: [
    '/checkout/address', '/checkout/summary'
  ],
};