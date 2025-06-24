import Joi from 'joi';
import { validateRequest } from './helper';
import i18n from '../locales'; // Adjust path to your i18n setup


// Validation for account creation
export const createAccountSchema = (req, res, next): void => {
  const schema = Joi.object({
    firstName: Joi.string().required().messages({
      'string.empty': 'First name is required',
    }),
    lastName: Joi.string().required().messages({
      'string.empty': 'Last name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email address',
      'string.empty': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.empty': 'Password is required',
    }),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
      'string.length': 'Phone number must be exactly 10 digits',
      'string.pattern.base': 'Phone number must contain only digits',
      'string.empty': 'Phone number is required',
    }),
  });

  validateRequest(req, next, schema);
};
  

export const loginSchema = (req, res, next): void => {
  try {
    const schema = Joi.object({
      data: Joi.object({
        email: Joi.string().email().required().messages({
          'string.email': i18n.__('common').invalidEmail,
          'string.empty': i18n.__('common').emailRequired,
          'any.required': i18n.__('common').emailRequired,
        }),
        password: Joi.string().required().messages({
          'string.empty': i18n.__('users').passwordRequired,
          'any.required': i18n.__('users').passwordRequired,
        }),
      }).required(),
    });

    validateRequest(req, next, schema);
  } catch (err) {
    next(err);
  }
};
