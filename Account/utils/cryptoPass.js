'use strict'

const { pbkdf2Sync } = require('crypto')
const secret = 'n%D3qzhr5+sbQU}nzckccCfjtz2g7DfVdZN|]sa*F8K40i"R;PN-Q1c;{7+^'
// se encripta la contraseña
const encryptPass = (data) => {
  return pbkdf2Sync(data, secret, 100000, 64, 'sha512').toString('hex')
}

module.exports = { encryptPass }
