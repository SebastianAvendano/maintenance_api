'use strict'
const mongoose = require('mongoose')
const AbstractModel = require('./abstractModel')
const Types = mongoose.Schema.Types
require('./user')
require('./categoria')

const Schema = new mongoose.Schema({

  code: {
    type: Types.String,
    require: [true, 'el codigo es requerido'],
    unique: true
  },
  product: [{
    type: Types.Mixed
  }],
  category: [{
    type: Types.ObjectId,
    ref: 'Category'
  }],
  client: {
    type: Types.ObjectId,
    ref: 'User'
  },
  employee: {
    type: Types.String
  },
  description: {
    type: Types.String,
    lowercase: true,
    require: [true, 'la descripcion es requerida']
  },
  dateSell: {
    type: Types.Date,
    lowercase: true,
    require: [true, 'Ingrese fecha de la compra']
  },
  valueSell: {
    type: Types.String,
    require: [true, 'el valor es requerido']
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

class Sell extends AbstractModel {
  constructor () {
    super()
    this.fields = 'code product category client employee description valueSell dateSell isActive'
    this.model = mongoose.model('Sell', Schema)
    this.sort = { createAt: 1 }
    this.populate = [{ path: 'category', select: 'name', model: 'Categoria' }, { path: 'client', select: 'name', model: 'User' }]
  }
}

module.exports = new Sell()
