const joi = require("joi");

const userJoiSchema = joi.object({
  name: joi.string().min(4).max(10).required().messages({
    "string.min": "Atleast 4 characters required",
    "string.max": "only 10 characters required",
  }),

  email: joi.string().min(4).required().messages({
    "string.min": "Atleast 4 characters required",
  }),

  phone: joi
    .string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "please enter valid 10-digit phone number",
    }),

  password: joi.string().min(6).max(10).required().messages({
    "string.min": "Atleast 6 characters required",
    "string.max": "only 10 characters max",
  }),
});

module.exports = userJoiSchema;
