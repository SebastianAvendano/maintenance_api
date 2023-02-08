'use strict'

const { Router } = require('express')
const RutaProveedor = require('./provider')
const routes = Router()

routes.use('/provider', RutaProveedor)

module.exports = routes
