const bcrypt = require('bcrypt')

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  return bcrypt.hash(user.password, SALT_FACTOR).then(function (hash) {
    user.setDataValue('password', hash)
  })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = async function (password) {
    const res = await bcrypt.compare(password, this.password)
    return res
  }
  return User
}
