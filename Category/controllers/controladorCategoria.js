'use strict'

const ModeloCategoria = require('../models/categoria')
const AuthMiddlewa = require('../middleware/token')

/* =============================================
    Se crea una clase controlador para la creacion de los metodos a utilizar para el consumo de las rutas
    ============================================= */
class Controlador {
  /* =============================================
    FUNCIÓN CREATE: se genera la consulta de si existe ya la categoria mdiante la variable CurrentCategory al cual hacemos la peticion al modelo de categoria mediante el metodo get que nos sirve para listar todos los datos que hayan creados, ya despues de listar y verificar que no este creado el mismo dato se precedee a crear el nuevo dato del modelo de categoria.
    ============================================= */
  async create (data) {
    if (Object.keys(data).length > 0) {
      const CurrentCategory = await ModeloCategoria.get({ name: data.name })
      if (CurrentCategory.length > 0) {
        return false
      }
      const category = await ModeloCategoria.create(data)
      return category
    }
    return false
  }

  /* =============================================
    Creamos el metodo de autenticacion para validar los datos recibidos por el usuario
    ============================================= */
  async authentication (data) {
    if (Object.keys(data).length > 0) {
      const { name } = data
      const category = await ModeloCategoria.get({ name })
      if (category._id) {
        const token = await AuthMiddlewa.encryptToken(category._id)
        return { token }
      }
      return false
    }
    return false
  }

  /* =============================================
    FUNCIÓN GET: utilizamos este metodo de consulta de los datos que esten creados en el modelo de coleccion
    ============================================= */
  async get (data) {
    if (data) {
      const category = await ModeloCategoria.search({ isActive: true, ...data})
      return category
    }
    return false
  }

  /* =============================================
    FUNCIÓN Update: se genera la misma constante para la consulta del dato a modificar o actualizar, ya consultado y encontrado el dato se procede a crear la variable de actualizacion para el dato
    ============================================= */
  async update (_id, data) {
    if (_id && Object.keys(data).length > 0) {
      const CurrentCategory = await ModeloCategoria.get({ _id })
      if (CurrentCategory._id) {
        const category = await ModeloCategoria.update(_id, data)
        return category
      }
      return false
    }
    return false
  }

  /* =============================================
    FUNCIÓN DElETE: se genera la misma constante para la consulta del dato a eliminar, ya consultado y encontrado el dato se procede a crear la variable de eliminar para el dato mediante el parametro _id
    ============================================= */
  async delete (_id) {
    if (_id) {
      const CurrentCategory = await ModeloCategoria.get({ _id })
      if (CurrentCategory._id) {
        const category = await ModeloCategoria.delete(_id)
        return category
      }
      return false
    }
    return false
  }

  /* =============================================
  FUNCIÓN Put para actualizar el estado de la categoria
  ============================================= */
  async desability(_id){
    if( _id ){
      const CurrentCategory = await ModeloCategoria.get({ _id })
      if(CurrentCategory._id){
        const categoryAbility = await ModeloCategoria.update(CurrentCategory._id, { isActive: false })
        return categoryAbility
      }
      return false
    }
    return []
  }
}

module.exports = new Controlador()
