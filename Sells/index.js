'use strict'
/* =============================================
REQUERIMIENTOS De Las Importaciones
============================================= */
require('./config/db')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./urls')

/* =============================================
Creo la variable app para tener todas las funcionalidades de EXPRESS y fijamos el puerto al cual vamos a acceder a nuestro proyecto
============================================= */
const port = 3005
const app = express()

app.use(cors())

/* =============================================
MIDDLEWARE o Bloque de Codigo PARA BODY PARSER
============================================= */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, limit: '2000mb' }))
app.use(express.json())
app.use('', routes)

/* =============================================
SALIDA PUERTO HTTP
============================================= */
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
