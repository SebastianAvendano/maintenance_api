'use strict'
const sellModel = require('../models/sell')
const AuthMiddleware = require('../middleware/token')

class SellController {
  /* =============================================
  FUNCIÓN GET
  ============================================= */
  async get (data) {
    if (data) {
      console.log(data)
      const sell = await sellModel.search({ isActive: true, ...data})
      console.log(sell)
      return sell
    }
    return false
  }

  /* =============================================
  FUNCIÓN POST
  ============================================= */
  async create (data) {
    if (Object.keys(data).length > 0) {
      const currentPos = await sellModel.get({ code: data.code })
      if (currentPos.length > 0) {
        return false
      }
      const sell = await sellModel.create(data)
      console.log(sell)
      return sell
    }
    return false
  }

  async authentication (data) {
    if (Object.keys(data).length > 0) {
      const { code, description } = data
      const sell = await sellModel.get({ code, description })
      if (sell._id) {
        const token = await AuthMiddleware.encriptToken(sell._id)
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
      const currentSell = await sellModel.get({ _id })
      if (currentSell._id) {
        const sell = await sellModel.update(currentSell._id, data)
        return sell
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
      const currentSell = await sellModel.get({ _id })
      if (currentSell._id) {
        const sell = await sellModel.delete(currentSell._id)
        return sell
      }
      return false
    }
    return false
  }

  /* =============================================
  FUNCIÓN DESABIITY SELLS
  ============================================= */
  async desabilitySell(_id){
    if(_id){
      const currentSell = await sellModel.get({ _id })
      if(currentSell._id){
        const sellAbility = await sellModel.update(currentSell._id, {isActive: false})
        return sellAbility
      }
      return false
    }
    return []
  }
}

module.exports = new SellController()
