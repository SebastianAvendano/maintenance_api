'use strict'
const mongoose = require('mongoose')
const AbstractModel = require('./abstractModel')
const Types = mongoose.Schema.Types

/* =============================================
 se crea la constante Schema para almacenar el modelo de la coleccion
============================================= */
const Schema = new mongoose.Schema({
  name: {
    type: Types.String,
    lowercase: true,
    require: [true, 'El nombre es requerido'],
    unique: true
  },
  description: {
    type: Types.String,
    lowercase: true,
    require: [true, 'la descripcion es requerida']
  },
  isActive: {
    type: Types.Boolean,
    default: true
  },
  createAt: {
    type: Types.Date,
    default: Date.now
  }
})

class Category extends AbstractModel {
  constructor () {
    super()
    this.model = mongoose.model('Categoria', Schema)
    this.sort = { createAt: 1 }
  }
}

module.exports = new Category()
