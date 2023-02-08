'use strict'
const UserModel = require('../models/user')
const { encryptPass } = require('../utils/cryptoPass')
const AuthMiddleware = require('../middleware/token')
const RolsModel = require('../models/Roles')

/* ============================================
Se crea la clase UserController para almacenar todos los metodos de consulta, creacion y actualizacion de datos.
============================================= */
class UserController {
  /* =============================================
  FUNCIÓN GET
  ============================================= */
  async get (data) {
    if (data) {
      const user = await UserModel.search(data)
      return user
    }
    return []
  }

   /* =============================================
  FUNCIÓN GET, POST, PUT, DELETE CONTROLLER ADMINISTRATIVE
  ============================================= */
  async listUserAdmin() {
    const rol = await RolsModel.get({ name: "Admin" });
    const users = await UserModel.search({ rol: rol._id });
    if (users.length > 0) {
      return users;
    }
    return [];
  }

  async createUserAdmin (data) {
    const rol = await RolsModel.get({ name: "Admin"})
    if(Object.keys(data).length > 0){
      const currenUser = await UserModel.get({ identification: data.identification})
      if(currenUser.length > 0){
        return false
      }
      data.rol = rol._id
      const user = await UserModel.create(data)
      return user
    }
    return []
  }

  async updateUserAdmin (_id, data){
    const rol = await RolsModel.get({ name: "Admin"})
    if(_id && Object.keys(data).length > 0){
      const currentUser = await UserModel.get({ _id })
      if(currentUser._id){
        data.rol = rol._id
        const user = await UserModel.update( currentUser._id, data)
        return user
      }
      return false
    }
    return []
  }

  async deleteUserAdmin(_id) {
    const rol = await RolsModel.get({ name: "Admin" });
    if( _id ) {
      const currentUser = await UserModel.get({ _id });
      if (currentUser._id) {
        const user = await UserModel.delete(currentUser._id)
        return user
      }
      return false
    } 
    return []
  }
  /* =============================================
  FUNCIÓN de autenticacion: se crean las constantes "email" y "password" y la igualamos a la data que recibimos;
  En la constante newPassword encriptamos la contraseña y por ultimo pasamos en token por medio de la condicional "if"
  ============================================= */

  async authentication (data) {
    if (Object.keys(data).length > 0) {
      const { email, password } = data
      const newPassword = encryptPass(password)
      const user = await UserModel.get({ email, password: newPassword })
      if (user._id) {
        const token = await AuthMiddleware.encrypToken(user._id)
        return ({ token })
      }
      return false
    }
    return false
  }

  /* =============================================
  FUNCIÓN GET, POST, PUT, DELETE CONTROLLER Usuario Cliente
  ============================================= */
  async listUserClient() {
    const rol = await RolsModel.get({ name: "Client" });
    const users = await UserModel.search({ rol: rol._id, isActive: true });
    if (users.length > 0) {
      return users;
    }
    return [];
  }

  async createUserClient (data) {
    const rol = await RolsModel.get({ name: "Client" })
    if(Object.keys(data).length > 0){
      const currenUser = await UserModel.get({ identification: data.identification })
      if(currenUser.length > 0){
        return false
      }
      data.rol = rol._id
      const user = await UserModel.create(data)
      console.log(user)
      return user
    }
    return []
  }

  async updateUserClient (_id, data){
    const rol = await RolsModel.get({ name: "Client"})
    if(_id && Object.keys(data).length > 0){
      const currentUser = await UserModel.get({ _id })
      if(currentUser._id){
        data.rol = rol._id
        const user = await UserModel.update( currentUser._id, data)
        return user
      }
      return false
    }
    return []
  }

  async deleteUserClient(_id) {
    const rol = await RolsModel.get({ name: "Client" });
    if( _id ) {
      const currentUser = await UserModel.get({ _id });
      if (currentUser._id) {
        const user = await UserModel.delete(currentUser._id)
        return user
      }
      return false
    } 
    return []
  }

  /* =============================================
  FUNCIÓN PUT
  ============================================= */
  async desability(_id){
    if( _id ){
      const currentUser = await UserModel.get({ _id })
      if(currentUser._id){
        const userAbility = await UserModel.update(currentUser._id, { isActive: false })
        return userAbility
      }
      return false
    }
    return []
  }

  /* =============================================
  FUNCIÓN CreateRols: creamos los tipos de rol para la coleccion de usuarios
  ============================================= */

  async CreateRols (data) {
    if (Object.keys(data).length > 0) {
      const currentRols = await RolsModel.get({ rol: data.rol })
      if (currentRols.length > 0) {
        return false
      }
      const rols = await RolsModel.create(data)
      return rols
    }

    return []
  }
}

module.exports = new UserController()
