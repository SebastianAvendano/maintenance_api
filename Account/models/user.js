'use strict'
const mongoose = require('mongoose')
const { encryptPass } = require('../utils/cryptoPass')
const AbstractModel = require('./abstractModel')

/* =============================================
 se crea la constante validateEmail para validar que el email tenga el formato adeciado mediante la expresion regular
============================================= */

const validateEmail = function (email) {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return re.test(email)
}

const Types = mongoose.Schema.Types

/* =============================================
 se crea la constante Schema para almacenar el modelo de la coleccion
============================================= */

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
    type: Types.String
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
  direction: {
    type: Types.String,
    lowercase: true,
    require: [true, 'la direccion es requerida']
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

/* =============================================
Se encripta la contraseña
============================================= */

Schema.pre('save', function (next) {
  if (this.password) {
    this.password = encryptPass(this.password)
  }
  next()
})
class User extends AbstractModel {
  constructor () {
    super()
    this.fields = 'identification name cellphone email rol password direction isActive '
    this.model = mongoose.model('User', Schema)
    this.sort = { createAt: 1 }
  }
}

module.exports = new User()
