'use strict'

class ModeloAbstracto {
  constructor () {
    this.perPage = 50
    this.sort = undefined
    this.model = undefined
    this.fields = undefined
    this.populate = undefined
  }

  async create (data) {
    const model = this.model(data)
    let response
    try {
      response = await model.save()
      response = { _id: response._id }
    } catch (error) {
      response = null
    }
    return response
  }

  async get (data) {
    try {
      let results = await this.model.findOne(data, this.fields).sort(this.sort)
      if (this.populate) {
        results = await this.model
          .findOne(data, this.fields)
          .populate(this.populate)
          .sort(this.sort)
      }
      if (results) {
        return results
      }
    } catch (error) {}
    return {}
  }

  async search (data) {
    let objects = await this.model.find(data, this.fields).sort(this.sort)
    if (this.populate) {
      objects = await this.model.find(data, this.fields).populate(this.populate).sort(this.sort)
    }
    return objects
  }

  async searchByPage (data, page) {
    if (page > 0) {
      let results = await this.model.find(data, this.fields)
        .skip((this.perPage * page) - this.perPage)
        .sort(this.sort).limit(this.perPage).exec()
      if (this.populate) {
        results = await this.model
          .find(data, this.fields)
          .populate(this.populate)
          .skip((this.perPage * page) - this.perPage)
          .sort(this.sort).limit(this.perPage).exec()
      }
      return results
    } else {
      return []
    }
  }

  async filterByPage (page) {
    const results = await this.searchByPage({}, page)
    return results
  }

  async update (_id, data) {
    try {
      await this.model.findByIdAndUpdate(_id, data, { runValidators: true })
      return { updated: true }
    } catch (error) {
      return null
    }
  }

  async delete (_id) {
    const object = await this.model.findByIdAndDelete(_id)
    if (object === null) {
      return { deleted: false }
    }
    return { deleted: true }
  }

  async count (data) {
    const objects = await this.model.find(data).count()
    return objects
  }
}

module.exports = ModeloAbstracto
