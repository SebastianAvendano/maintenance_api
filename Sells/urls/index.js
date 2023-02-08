'use strict'
const { Router } = require('express')
const RouteSell = require('./routeSell')

const routes = Router()

routes.use('/sell', RouteSell)

module.exports = routes
