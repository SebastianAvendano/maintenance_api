'use strict'

const ModelProvider = require('../models/modeloProveedor')
const AuthMiddlewar = require('../middleware/token')

class ProviderController {
  /* =============================================
    FUNCIÓN GET
    ============================================= */
  async get (data) {
    if (data) {
      const provider = await ModelProvider.search({isActive: true, ...data})
      return provider
    }
    return false
  }

  /* =============================================
    FUNCIÓN POST
    ============================================= */
  async create (data) {
    if (Object.keys(data).length > 0) {
      const currentProv = await ModelProvider.get({ identification: data.identification })
      if (currentProv.length > 0) {
        return false
      }
      const provee = await ModelProvider.create(data)
      return provee
    }
    return false
  }

  async authentication (data) {
    if (Object.keys(data).length > 0) {
      const { identification, name } = data
      const provider = await ModelProvider.get({ identification, name })
      if (provider._id) {
        const token = await AuthMiddlewar.encryptToken(provider._id)
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
      const currentProv = await ModelProvider.get({ _id })
      if (currentProv._id) {
        const provider = await ModelProvider.update(currentProv._id, data)
        return provider
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
      const currentProv = await ModelProvider.get({ _id })
      if (currentProv._id) {
        const provider = await ModelProvider.delete(currentProv._id)
        return provider
      }
      return false
    }
    return false
  }

  /* =============================================
    FUNCIÓN DESABILITY PROVEEDOR 
    ============================================= */
  async desabilityProvider (_id) {
    if(_id){
      const currentProvider = await ModelProvider.get({ _id })
      if(currentProvider._id){
        const providerAvility = await ModelProvider.update(currentProvider._id, { isActive: false })
        return providerAvility  
      }
      return false
    }
    return []
  }  
}

module.exports = new ProviderController()
