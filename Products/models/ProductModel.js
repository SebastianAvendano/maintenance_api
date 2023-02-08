'use strict'

const mongoose = require('mongoose')
const ModelAbstract = require('./abstractModel')
const Types = mongoose.Schema.Types
require('./categoria')
require('./modeloProveedor')

const ProductSchema = new mongoose.Schema({

  reference: {
    type: Types.String,
    require: [true, 'la referencia es requerida']
  },
  name: {
    type: Types.String,
    lowercase: true,
    require: [true, 'El nombre es requerido']
  },
  stamp: {
    type: Types.String,
    lowercase: true,
    require: [true, 'La marca es requerida']
  },
  category: [{
    type: Types.ObjectId,
    ref: 'Category'
  }],
  provider: [{
    type: Types.ObjectId,
    ref: 'Provider'
  }],
  cost: {
    type: Types.String,
    require: [true, 'el valor de la compra es requerida']
  },
  dateCompra: {
    type: Types.Date,
    lowercase: true,
    require: [true, 'la fecha es requerida']
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

class Product extends ModelAbstract {
  constructor () {
    super()
    this.fields = 'reference name cost stamp provider category isActive'
    this.model = mongoose.model('Product', ProductSchema)
    this.sort = { createAt: 1 }
    this.populate = [{ path: 'category', select: 'name', model: 'Categoria' }, { path: 'provider', select: 'name', model: 'Provider' }]
  }
}

module.exports = new Product()
