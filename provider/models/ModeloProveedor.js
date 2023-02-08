'use strict'
const mongoose = require('mongoose')
const ModeloAbstracto = require('./abstractModel')

const validateEmail = function (email) {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return re.test(email)
}

const Types = mongoose.Schema.Types

const ProviderSchema = new mongoose.Schema({

  identification: {
    type: Types.String,
    require: [true, 'la identificacion es requerida'],
    unique: true
  },
  name: {
    type: Types.String,
    lowercase: true,
    require: [true, 'El nombre es requerido']
  },
  email: {
    type: Types.String,
    require: [true, 'El email es requerido'],
    unique: true,
    validate: [validateEmail, 'el email ingresado no es valido'],
    match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/]
  },
  cellphone: {
    type: Types.Number,
    lowercase: true,
    require: [true, 'El teléfono es requerido']
  },
  direction: {
    type: Types.String,
    lowercase: true,
    require: [true, 'El nombre es requerido']
  },
  city: {
    type: Types.String,
    lowercase: true,
    require: [true, 'la ciudad es requerida']
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

class Provider extends ModeloAbstracto {
  constructor () {
    super()
    this.fields = 'identification name email direction city cellphone isActive'
    this.model = mongoose.model('Provider', ProviderSchema)
    this.sort = { createAt: 1 }
  }
}

module.exports = new Provider()
