'use strict'
const { sign, verify } = require('jsonwebtoken')
const userModel = require('../models/user')
const SECRET = 'Cb6t%5UpGtx-G@jUM[RG~a234090k8MKStC]=}pBlIT:C-d9901fc06f2e8b3a815dae6'

/* =============================================
    Se crea una clase para la creacion de los metodos a utilizar para la encriptación y validacion del token de los datos a trabajar
    ============================================= */
class AuthMiddlewa {
  async encryptToken (data) {
    return sign({ id: data }, SECRET, { algorithm: 'HS512', expiresIn: 3600 * 24 })
  }

  async validateToken (request, response, next) {
    const authorization = request.headers.authorization
    if (authorization) {
      const token = authorization.split(' ')[1]
      try {
        const resultVerify = await verify(token, SECRET)
        const id = resultVerify.id
        console.log(id)
        const user = await userModel.get({ _id: id })
        console.log(user)
        if (user._id) {
          request.Categoria = { id }
          return next()
        }
      } catch (TokenExpiredError) {}
    }
    response.send({ errors: { message: 'las credenciales de autenticacion no se proveyeron' } })
  }
}
module.exports = new AuthMiddlewa()
