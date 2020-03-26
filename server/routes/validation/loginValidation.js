const Joi = require("@hapi/joi")

const loginValidation = Joi.object().keys({
  email: Joi.string()
    .email()
    .min(3)
    .max(255),
  password: Joi.string().min(8)
})

module.exports = loginValidation
