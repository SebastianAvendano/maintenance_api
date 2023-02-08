const isSuperAdmin = (req, res, next) => {
  if (req.Categoria && req.Categoria.rol === 'superadmin') {
    next()
  }
  res.send({ errors: { message: 'Acceso invalido' } })
}

module.exports = { isSuperAdmin }
