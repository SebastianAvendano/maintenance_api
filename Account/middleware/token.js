'use strict'
const { sign, verify } = require('jsonwebtoken')
const UserModel = require('../models/user')
const SECRET = 'Cb6t%5UpGtx-G@jUM[RG~a234090k8MKStC]=}pBlIT:C-d9901fc06f2e8b3a815dae6'

class AuthMiddleware {
  /* =============================================
  encriptamos el token y le damos una vigencia de 24 horas
  ============================================= */

  async encrypToken (data) {
    return sign({ id: data }, SECRET, { algorithm: 'HS512', expiresIn: 3600 * 24 })
  }
  /* =============================================
  ValidateToken: validamos que el usurario exista en la coleccion y que tenga un token vigente
  ============================================= */

  async validateToken (request, response, next) {
    const authorization = request.headers.authorization
    if (authorization) {
      const token = authorization.split(' ')[1]
      try {
        const resultVerify = await verify(token, SECRET)
        const id = resultVerify.id
        const user = await UserModel.get({ _id: id })
        if (user._id) {
          request.User = { id, rol: user.rol }
          return next()
        }
      } catch (TokenExpiredError) {}
    }
    response.send({ errors: { message: 'Las credenciales de autenticación no se proveyeron.' } })
  }
}

module.exports = new AuthMiddleware()
