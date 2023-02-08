'use strict'

const mongoose = require('mongoose')

/* =============================================
Conexion a la base de datos
============================================= */

mongoose.connect('mongodb://localhost/maintenance', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
const db = mongoose.connection

db.on('error', (error) => {
  console.log(`MONGODB connection error ${error}`)
  process.exit(0)
})

module.exports = { db }
