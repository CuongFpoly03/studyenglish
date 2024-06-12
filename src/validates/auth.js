const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(5).required(),
  password: Joi.string().min(6).required(),
  verify: Joi.boolean(),
  introduction: Joi.string(),
  image: Joi.string(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  registerSchema: registerSchema,
  loginSchema: loginSchema,
};
