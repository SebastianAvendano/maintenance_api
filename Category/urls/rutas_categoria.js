' use strict'

const { Router } = require('express')
const CategoryController = require('../controllers/controladorCategoria')
const routes = Router()
const express = require('express')
const AuthMiddlewa = require('../middleware/token')

routes.use(express.json())

/* =============================================
PETICIONES GET
============================================= */
routes.get('/view', AuthMiddlewa.validateToken, async (req, res) => {
  const result = await CategoryController.get(req.body)
  res.json(result)
})

/* =============================================
PETICIONES POST
============================================= */
routes.post('/create', AuthMiddlewa.validateToken, async (req, res) => {
  const response = await CategoryController.create(req.body)
  res.json(response)
})

/* =============================================
PETICIONES PUT
============================================= */
routes.put('/update/:id', AuthMiddlewa.validateToken, async (req, res) => {
  const response = await CategoryController.update(req.params.id, req.body)
  res.json(response)
})

/* =============================================
PETICIONES DELETE
============================================= */
routes.delete('/delete/:id', AuthMiddlewa.validateToken, async (req, res) => {
  const id = await CategoryController.delete(req.params.id)
  res.json(id)
})

/* =============================================
Desability Categorys
============================================= */
routes.put('/desabilityCategory/:id', AuthMiddlewa.validateToken, async (req, res) => {
  const result = await CategoryController.desability(req.params.id)
  res.json(result)
} )


routes.use((error, req, res) =>
  res.status(400).json({
    status: 'error',
    message: error.message
  })
)

module.exports = routes
