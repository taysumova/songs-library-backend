const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    const { error, value } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Некорректный email '
          })
          break
        case 'password':
          res.status(400).send({
            error: `Введенный пароль не соответствует требованиям:
                    <br>
                    1. Пароль должен содержать ТОЛЬКО буквы в верхнем и нижнем регистре
                    <br>
                    2. Пароль должен содержать от 8 до 32 символов
                    `
          })
          break
        default:
          res.status(400).send({
            error: 'Данные введены некорректно'
          })
      }
    } else {
      next()
    }
  }
}
