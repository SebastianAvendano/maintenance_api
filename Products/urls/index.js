'use strict'

const { Router } = require('express')
const ProductRoute = require('./rutaProducto')
const routes = Router()

routes.use('/product', ProductRoute)

module.exports = routes
