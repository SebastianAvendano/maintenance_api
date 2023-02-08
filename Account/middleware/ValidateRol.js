const isSuperAdmin = (request, response, next) => {
  if (request.User && request.User.rol === 'superadmin') {
    next()
  }
  response.send({ errors: { message: 'Acceso inválido' } })
}

const moderator = (req, res, next) => {
  if (req.User && req.User.rol === 'Moderador') {
    next()
  }
  res.send({ errors: { message: 'Acceso Invalido' } })
}

const admin = (req, res, next) => {
  if (req.User && req.User.rol === 'admin') {
    next()
  }
  res.send({ errors: { message: 'Acceso Invalido' } })
}

module.exports = { isSuperAdmin, moderator, admin }
