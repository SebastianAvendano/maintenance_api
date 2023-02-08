'use strict'

/* =============================================
REQUERIMIENTOS De Las Importaciones
============================================= */

require('./config/db')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./urls')
const port = 3001
const app = express()

/* =============================================
MIDDLEWARE o Bloque de Codigo PARA BODY PARSER
============================================= */

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, limit: '2000mb' }))
app.use('', routes)

/* =============================================
SALIDA PUERTO HTTP
============================================= */
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
