import { logger } from '../logger/Logger';
import appError from '../utils/errorHelper';
import { ErrorType } from '../utils/errorTypes';

export const validateRequest = (req, next, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  };
  const dataToValidate = req.body.data || req.body;

  const { error, value } = schema.validate(dataToValidate, options);
  if (error) {
    // next(error);
    const message = error.details.map(x => x.message).join(', ');


    // Log with your desired format
    logger.error(`Validation Error:  ${message}`);
    throw new appError(`${error.details.map(x => x.message).join(', ')}`, ErrorType.invalid_request);
  } else {
    if (req.body.data) {
      req.body.data = value;
    } else {
      req.body = value;
    }
    next();
  }
};