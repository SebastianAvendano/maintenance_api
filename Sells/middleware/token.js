'use strict'
const { sign, verify } = require('jsonwebtoken')
const userModel = require('../models/user')
const SECRET = 'Cb6t%5UpGtx-G@jUM[RG~a234090k8MKStC]=}pBlIT:C-d9901fc06f2e8b3a815dae6'

class AuthMiddleware {
  async encriptToken (data) {
    return sign({ id: data }, SECRET, { algorithm: 'HS384', expiresIn: 3600 * 24 })
  }

  async validateToken (request, response, next) {
    const authorization = request.headers.authorization
    if (authorization) {
      const token = authorization.split(' ')[1]
      try {
        const resultVerify = await verify(token, SECRET)
        const id = resultVerify.id
        const sell = await userModel.get({ _id: id })
        if (sell._id) {
          request.Sell = { id }
          return next()
        }
      } catch (TokenExpiredError) {}
    }
    response.send({ errors: { message: 'las credenciales de autenticacion no se proveyeron' } })
  }
}

module.exports = new AuthMiddleware()
