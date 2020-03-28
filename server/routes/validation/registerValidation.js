const Joi = require("@hapi/joi")

const registerValidation = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(60)
    .required(),
  email: Joi.string()
    .email()
    .min(3)
    .max(255)
    .required(),
  password: Joi.string()
    .min(8)
    .max(120)
    .required(),
  confirmPassword: Joi.ref("password")
})

module.exports = registerValidation
