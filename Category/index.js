/* =============================================
REQUERIMIENTOS De Las Importaciones
============================================= */
'use strict'

require('./config/db')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./urls')

const port = 3002
const app = express()

app.use(cors())

/* =============================================
MIDDLEWARE o Bloque de Codigo PARA BODY PARSER
============================================= */
app.use(bodyParser.urlencoded({ extended: true, limit: '2000mb' }))
app.use(bodyParser.json())
app.use('', routes)
app.use(express.json())

/* =============================================
SALIDA PUERTO HTTP
============================================= */
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
