module.exports = (req, res, next) => {
  if (req.user && req.user.tipo === 'ADMIN') {
    return next();
  }
  return res.status(403).json({ error: 'Acesso restrito para administradores.' });
};
