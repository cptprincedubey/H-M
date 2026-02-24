const joi = require("joi");

const userJoiSchema = joi.object({
  name: joi.string().min(4).max(50).pattern(/^[a-zA-Z\s]+$/).required().messages({
    "string.min": "Atleast 4 characters required",
    "string.max": "Name cannot exceed 50 characters",
    "string.pattern.base": "Name must contain only letters and spaces",
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

  password: joi.string().min(6).max(128).required().messages({
    "string.min": "Atleast 6 characters required",
    "string.max": "Password cannot exceed 128 characters",
  }),
});

module.exports = userJoiSchema;
