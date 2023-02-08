'use strict'

const { Router } = require('express')
const ProviderController = require('../controladores/controladProveedor')
const AuthMiddleware = require('../middleware/token')

const routes = Router()
const express = require('express')
routes.use(express.json())

/* =============================================
PETICIONES GET
============================================= */
routes.get('/view', AuthMiddleware.validateToken, async (req, res) => {
  const response = await ProviderController.get(req.body)
  res.json(response)
})

/* =============================================
PETICIONES POST
============================================= */
routes.post('/create', async (req, res) => {
  const result = await ProviderController.create(req.body)
  res.json(result)
})

routes.post('/authentication', async (req, res) => {
  const result = await ProviderController.authentication(req.body)
  res.json(result)
})

/* =============================================
PETICIONES PUT
============================================= */
routes.put('/update/:id', AuthMiddleware.validateToken, async (req, res) => {
  const response = await ProviderController.update(req.params.id, req.body)
  res.json(response)
})

/* =============================================
PETICIONES DELETE
============================================= */
routes.delete('/delete/:id', AuthMiddleware.validateToken, async (req, res) => {
  const id = await ProviderController.delete(req.params.id)
  res.json(id)
})


/* =============================================
PETICIONES FOR DESABILITY PROVIDER
============================================= */
routes.put('/desabilityProvider/:id', AuthMiddleware.validateToken, async (req, res) => {
  const response = await ProviderController.desabilityProvider(req.params.id)
  res.json(response)
})

module.exports = routes
