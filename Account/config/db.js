'use strict'

const mongoose = require('mongoose')

// conexion a la base de datos de mongoDB

mongoose.connect('mongodb://localhost/maintenance', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const db = mongoose.connection

// capturamos los errores de conexion y los mostramos en consola

db.on('error', (error) => {
  console.log(`MongoDB connection error: ${error}`)
  process.exit(0)
})

module.exports = db
