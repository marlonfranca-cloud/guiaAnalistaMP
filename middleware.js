export default function middleware(request) {
  const url = new URL(request.url);
  const { pathname } = url;

  // Rotas públicas — não precisam de sessão
  if (
    pathname === '/login' ||
    pathname === '/login.html' ||
    pathname.startsWith('/api/login') ||
    pathname.startsWith('/api/logout')
  ) {
    return;
  }

  // Lê o cookie mp_session
  const cookieStr = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieStr.split(';').map(pair => {
      const [k, ...v] = pair.trim().split('=');
      return [k.trim(), v.join('=').trim()];
    })
  );

  if (cookies['mp_session'] !== process.env.SESSION_SECRET) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return Response.redirect(loginUrl, 302);
  }

  // Sessão válida — deixa passar
  return;
}

export const config = {
  matcher: ['/((?!_vercel|favicon\\.ico|.*\\.(?:css|js|png|jpg|svg|ico|json)).*)'],
};
