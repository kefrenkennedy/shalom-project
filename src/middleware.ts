import decode from 'jwt-decode';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { TokenPayload } from '@/types/Auth';

import { TOKEN_KEY } from './hooks/auth';

const adminRoles = ['ADMINISTRATOR'];
const participantRoles = ['PARTICIPANT'];

const authPaths = ['/admin', '/participante'];
const guestPaths = [
  '/redefinir-senha',
  '/esqueci-a-senha',
  '/cadastro',
  '/admin/sign-in',
  '/participante/sign-in',
];

function convertRoleToPath(role: string) {
  if (adminRoles.includes(role)) return '/admin/inscricoes';
  else if (participantRoles.includes(role)) return '/participante/inscricoes';

  return '/';
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const isAuthPath = authPaths.some((authPath) =>
    currentPath.startsWith(authPath),
  );
  const isGuestPath = guestPaths.some((guestPath) =>
    currentPath.startsWith(guestPath),
  );

  const tokenCookie = request.cookies.get(TOKEN_KEY);

  if (!tokenCookie) {
    if (isGuestPath) return NextResponse.next();

    if (isAuthPath)
      return NextResponse.redirect(
        new URL('/participante/sign-in', request.url),
      );
  } else if (tokenCookie) {
    const tokenDecoded = decode(tokenCookie.value) as TokenPayload;

    const { role, exp } = tokenDecoded;
    const pathForRole = convertRoleToPath(role);

    if (isGuestPath) {
      return NextResponse.redirect(new URL(pathForRole, request.url));
    }

    // if token expired
    if (new Date(1000 * exp) < new Date()) {
      request.cookies.delete(TOKEN_KEY);
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (currentPath.startsWith('/admin') && !adminRoles.includes(role)) {
      return NextResponse.redirect(new URL(pathForRole, request.url));
    }

    if (
      currentPath.startsWith('/participante') &&
      !participantRoles.includes(role)
    ) {
      return NextResponse.redirect(new URL(pathForRole, request.url));
    }
  }
}

export const config = {
  matcher: [
    '/redefinir-senha',
    '/esqueci-a-senha',
    '/cadastro',
    '/admin/:path*',
    '/participante/:path*',
  ],
};
