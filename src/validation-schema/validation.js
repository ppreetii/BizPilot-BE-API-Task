const Joi = require("joi");
const COMMON = require("../constants/common");

const baseSchema = {
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(COMMON.VALIDATION.SIGNUP.PSWD_MIN_LEN)
    .max(COMMON.VALIDATION.SIGNUP.PSWD_MAX_LEN)
    .required(),
};

const loginSchema = Joi.object().keys(baseSchema);

const signUpSchema = Joi.object().keys({
  ...baseSchema,
  name: Joi.string().required(),
  code: Joi.string().length(COMMON.REF_CODE_LEN).error(new Error('Invalid Link'))
}).required();

const getUserSchema = Joi.object().keys({
  id: Joi.number().integer(),
  code: Joi.string().length(COMMON.REF_CODE_LEN),
}).required();

module.exports = {
    loginSchema,
    signUpSchema,
    getUserSchema
}