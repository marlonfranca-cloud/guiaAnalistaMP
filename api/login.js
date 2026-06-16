export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body || {};

  if (
    username === process.env.AUTH_USER &&
    password === process.env.AUTH_PASSWORD
  ) {
    res.setHeader(
      'Set-Cookie',
      `mp_session=${process.env.SESSION_SECRET}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`
    );
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ error: 'Usuário ou senha inválidos' });
}
