'use strict'

const { Router } = require('express')
const userRoutes = require('./user')

const routes = Router()

routes.use('/user', userRoutes)

module.exports = routes
