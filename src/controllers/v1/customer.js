const customerServices = require("../../services/customer");
const {
  signUpSchema,
  loginSchema,
  getUserSchema,
} = require("../../validation-schema/validation");

exports.signup = async (req, res, next) => {
  try {
    await signUpSchema.validateAsync(
      {
        ...req.body,
        ...req.params,
      },
      { abortEarly: false }
    );

    const { name, email, password } = req.body;
    const { code } = req.params;

    let result = await customerServices.signup(name, email, password, code);

    if (result?.message) {
      return res.status(result?.status || 400).json(result);
    }

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false });
    const { email, password } = req.body;

    const result = await customerServices.login(email, password);

    if (result?.message) {
      return res.status(result.status || 400).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { id, code } = req.query;
    
    let body = {};
    if (id) body.id = parseInt(id);
    if (code) body.code = code;

    await getUserSchema.validateAsync(body, { abortEarly: false });

    const result = await customerServices.getUser(id, code);

    if (result?.message) {
      return res.status(result.status || 400).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
