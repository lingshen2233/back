const joi = require("joi");

// patten 是正则
const id = joi.required();
const name = joi
  .string()
  .pattern(/^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/)
  .required();
const email = joi
  .string()
  .pattern(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
  .required();
const oldPassword = joi
  .string()
  .pattern(/^(?![0-9]+$)[a-z-0-9]{1,50}$/)
  .min(6)
  .max(12)
  .required();
const newPassword = joi
  .string()
  .pattern(/^(?![0-9]+$)[a-z-0-9]{1,50}$/)
  .min(6)
  .max(12)
  .required();
exports.name_limit = {
  body: {
    id,
    name,
  },
};
exports.email_limit = {
  body: {
    id,
    email,
  },
};
exports.password_limit = {
  body: {
    id,
    oldPassword,
    newPassword,
  },
};

exports.forgetPassword_limit = {
  body: {
    id,
    newPassword,
  },
};
