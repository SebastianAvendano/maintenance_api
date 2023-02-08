'use strict'
const { Router } = require('express')
const sellController = require('../controllers/sellController')
const AuthMiddleware = require('../middleware/token')

const routes = Router()

/* =============================================
PETICIONES GET
============================================= */

routes.get('/view', AuthMiddleware.validateToken, async (req, res) => {
  const response = await sellController.get(req.body)
  res.json(response)
})

/* =============================================
PETICIONES POST
============================================= */
routes.post('/create', async (req, res) => {
  const response = await sellController.create(req.body)
  res.json(response)
})

routes.post('/authentication', async (req, res) => {
  const result = await sellController.authentication(req.body)
  res.json(result)
})

/* =============================================
PETICIONES PUT
============================================= */
routes.put('/update/:id', AuthMiddleware.validateToken, async (req, res) => {
  const id = await sellController.update(req.params.id, req.body)
  res.json(id)
})

/* =============================================
PETICIONES DELETE
============================================= */
routes.delete('/delete/:id', AuthMiddleware.validateToken, async (req, res) => {
  const id = await sellController.delete(req.params.id)
  res.json(id)
})

/* =============================================
PETICIONES DESABILITY SELL
============================================= */
routes.put('/desabilitySell/:id', AuthMiddleware.validateToken, async (req, res) => {
  const response = await sellController.desabilitySell(req.params.id)
  res.json(response)
})


module.exports = routes
