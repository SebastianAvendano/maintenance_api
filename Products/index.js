/* =============================================
REQUERIMIENTOS De Las Importaciones
============================================= */
'use strict'

require('./config/database')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./urls')

/* =============================================
Creo la variable app para tener todas las funcionalidades de EXPRESS y fijamos el puerto al cual vamos a acceder a nuestro proyecto
============================================= */
const port = 3004
const app = express()

app.use(cors())

/* =============================================
MIDDLEWARE o Bloque de Codigo PARA BODY PARSER
============================================= */
app.use(bodyParser.urlencoded({ extended: true, limit: '2000mb' }))
app.use(bodyParser.json())
app.use(express.json())
app.use('', routes)

/* =============================================
SALIDA PUERTO HTTP
============================================= */
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
