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

const database = mongoose.connection

database.on('error', (error) => {
  console.log(`MONGODB connection error ${error}`)
  process.exit(0)
})

module.exports = { database }
