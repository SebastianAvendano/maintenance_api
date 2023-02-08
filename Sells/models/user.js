'use strict'
const mongoose = require('mongoose')
const AbstractModel = require('./abstractModel')

const Types = mongoose.Schema.Types

const Schema = new mongoose.Schema({
  identification: {
    type: Types.Number,
    unique: true
  },
  name: {
    type: Types.String,
    lowercase: true,
    require: [true, 'El nombre es requerido']
  },
  rol: [{
    ref: 'Roles',
    type: Types.ObjectId
  }],
  password: {
    type: Types.String,
    required: [true, 'La contraseña es Obligatoria']
  },
  email: {
    type: Types.String,
    require: [true, 'El email es requerido'],
    unique: true
  },
  cellphone: {
    type: Types.Number,
    lowercase: true,
    require: [true, 'El teléfono es requerido']
  },
  isActive: {
    type: Types.Boolean,
    default: false
  },
  createAt: {
    type: Types.Date,
    default: Date.now
  }
})

class User extends AbstractModel {
  constructor () {
    super()
    this.fields = 'identification name cellphone rol password '
    this.model = mongoose.model('User', Schema)
    this.sort = { createAt: 1 }
  }
}

module.exports = new User()
