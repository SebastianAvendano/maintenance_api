'use strict'

const { Router } = require('express')
const RutasCategory = require('./rutas_categoria')
const routes = Router()

routes.use('/category', RutasCategory)

module.exports = routes
