export function requireAdminToken(req: Request): { ok: true } | { ok: false; response: Response } {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    return { ok: false, response: new Response('ADMIN_TOKEN not configured', { status: 500 }) };
  }

  const headerToken = req.headers.get('x-admin-token') ?? '';
  const url = new URL(req.url);
  const queryToken = url.searchParams.get('token') ?? '';

  const provided = headerToken || queryToken;
  if (!provided || provided !== token) {
    return { ok: false, response: new Response('Unauthorized', { status: 401 }) };
  }
  return { ok: true };
}


