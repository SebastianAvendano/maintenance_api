'use strict'
const { Router } = require('express')
const UserController = require('../controllers/user')
const routes = Router()
const express = require('express')
const AuthMiddleware = require('../middleware/token')

routes.use(express.json())

/* =============================================
END POINT ADMINISTRATIVE
============================================= */
routes.get('/type/admin', AuthMiddleware.validateToken, async (req, res) =>{
  const response = await UserController.listUserAdmin(req.body)
  res.json(response)
})

routes.post('/create/admin', AuthMiddleware.validateToken, async (req, res) => {
  const response = await UserController.createUserAdmin(req.body)
  res.json(response)
})

routes.put('/update/admin/:id', AuthMiddleware.validateToken, async (req, res) => {
  const response = await UserController.updateUserAdmin(req.params.id, req.body)
  res.json(response)
})

routes.delete('/delete/admin/:id', AuthMiddleware.validateToken, async (req, res) => {
  const response = await UserController.deleteUserAdmin(req.params.id)
  res.json(response)
})

/* =============================================
END POINT USER CLIENT
============================================= */
routes.get('/type/client', AuthMiddleware.validateToken, async (req, res) =>{
  const response = await UserController.listUserClient(req.body)
  res.json(response)
})

routes.post('/create/userClient', AuthMiddleware.validateToken, async (req, res) => {
  const response = await UserController.createUserClient(req.body)
  res.json(response)
})

routes.put('/update/userClient/:id', AuthMiddleware.validateToken, async (req, res) => {
  const response = await UserController.updateUserClient(req.params.id, req.body)
  res.json(response)
})

routes.delete('/delete/userClient/:id', AuthMiddleware.validateToken, async (req, res) => {
  const response = await UserController.deleteUserClient(req.params.id)
  res.json(response)
})

/* =============================================
Desability User
============================================= */
routes.put('/desabilityUser/:id', AuthMiddleware.validateToken, async (req, res) => {
  const result = await UserController.desability(req.params.id)
  res.json(result)
} )

/* =============================================
Funciôn post Authentication
============================================= */
routes.post('/authentication', async (req, res) => {
  const response = await UserController.authentication(req.body)
  res.json(response)
})

/* =============================================
PETICIONES PARA ROLES
============================================= */
routes.post('/create/rols', async (req, res) => {
  const Rol = await UserController.CreateRols(req.body)
  res.json(Rol)
})

routes.use((error, req, res, next) =>
  res.status(400).json({
    status: 'error',
    message: error.message
  })
)

module.exports = routes
