'use strict'

const mongoose = require('mongoose')
const Types = mongoose.Schema.Types
const AbstractModel = require('./abstractModel')

/* =============================================
 se crea la constante RolSchema para almacenar el modelo de la coleccion
============================================= */

const RolSchema = new mongoose.Schema({

  name: {
    type: Types.String,
    unique: true
  },
  permisos: {
    type: Types.Array,
    require: true
  },
  isActive: {
    type: Types.Boolean,
    default: true
  },
  creatAt: {
    type: Types.Date,
    default: Date.now
  }
})

class Roles extends AbstractModel {
  constructor () {
    super()
    this.model = mongoose.model('Roles', RolSchema)
    this.sort = { creatAt: 1 }
  }
}

module.exports = new Roles()
