'use strict'

const ModelProduct = require('../models/ProductModel')
const AuthMiddleware = require('../middleware/token')

/* =============================================
    Se crea una clase controlador para la creacion de los metodos a utilizar para el consumo de las rutas
    ============================================= */
class Controlador {
  /* =============================================
    FUNCIÓN GET
    ============================================= */
  async get (data) {
    if (data) {
      const product = await ModelProduct.search({ isActive: true, ...data})
      return product
    }
    return false
  }

  /* =============================================
    FUNCIÓN POST
    ============================================= */
  async create (data) {
    if (Object.keys(data).length > 0) {
      const currentProduct = await ModelProduct.get({ reference: data.reference })
      if (currentProduct.length > 0) {
        return false
      }
      const product = await ModelProduct.create(data)
      return product
    }
    return false
  }

  async authentication (data) {
    if (Object.keys(data).length > 0) {
      const { reference, name } = data
      const user = await ModelProduct.get({ reference, name })
      if (user._id) {
        const token = await AuthMiddleware.encriptToken(user._id)
        return ({ token })
      }
      return false
    }
    return false
  }

  /* =============================================
    FUNCIÓN PUT
    ============================================= */
  async update (_id, data) {
    if (_id && Object.keys(data).length > 0) {
      const currentProduct = await ModelProduct.get({ _id })
      if (currentProduct._id) {
        const product = await ModelProduct.update(currentProduct._id, data)
        return product
      }
      return false
    }
    return false
  }

  /* =============================================
    FUNCIÓN DELETE
    ============================================= */
  async delete (_id) {
    if (_id) {
      const currentProduct = await ModelProduct.get({ _id })
      if (currentProduct._id) {
        const product = await ModelProduct.delete(currentProduct._id)
        return product
      }
      return false
    }
    return false
  }

  /* =============================================
    FUNCIÓN DSABILITY PRODUCTS
    ============================================= */
  async desabilityProducts(_id){
    if(_id){
      const currentProduct = await ModelProduct.get({ _id })
      if(currentProduct._id){
        const productAbility = await ModelProduct.update(currentProduct._id, { isActive: false })
        return productAbility
      }
      return false
    }
    return []
  }
  
}

module.exports = new Controlador()
