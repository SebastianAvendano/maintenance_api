'use strict'
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/maintenance', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
  console.log(`MongoDB connection error: ${error}`)
  process.exit(0)
})

module.exports = db
