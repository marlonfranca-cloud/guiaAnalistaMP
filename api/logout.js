module.exports = function handler(req, res) {
  res.setHeader(
    'Set-Cookie',
    'mp_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'
  );
  res.redirect(302, '/login');
};
