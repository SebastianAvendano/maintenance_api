'use strict'

const express = require('express')
const ProductControl = require('../controllers/controllerProduct')
const AuthMiddleware = require('../middleware/token')

const routes = express.Router()

/* =============================================
PETICIONES GET
============================================= */
routes.get('/view', AuthMiddleware.validateToken, async (req, res) => {
  const response = await ProductControl.get(req.body)
  res.json(response)
})

/* =============================================
PETICIONES POST
============================================= */
routes.post('/create', AuthMiddleware.validateToken, async (req, res) => {
  const response = await ProductControl.create(req.body)
  res.json(response)
})

// routes.post('/authentication', async (req, res) =>{
//     const result = await ProductControl.authentication(req.body)
//     res.json(result)
// })

/* =============================================
PETICIONES PUT
============================================= */
routes.put('/update/:id', AuthMiddleware.validateToken, async (req, res) => {
  const id = await ProductControl.update(req.params.id, req.body)
  res.json(id)
})

/* =============================================
PETICIONES DELETE
============================================= */
routes.delete('/delete/:id', AuthMiddleware.validateToken, async (req, res) => {
  const id = await ProductControl.delete(req.params.id)
  res.json(id)
})

/* =============================================
PETICIONES FOR DESABILITY PRODUCTS
============================================= */
routes.put('/desabilityProducts/:id', AuthMiddleware.validateToken, async (req, res) => {
  const response = await ProductControl.desabilityProducts(req.params.id)
  res.json(response)
})

module.exports = routes
