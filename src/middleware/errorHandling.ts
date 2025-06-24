import i18n from '../locales';
import { logger } from '../logger/Logger';
import { ErrorType } from '../utils/errorTypes';

async function generateErrorResponse(err, status, req, res) {
  try {
    logger.error(`${status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  } catch (error) {
    logger.error(`Failed to track request: ${error.message}`);
  }

  const errObj = { status: status, message: err.message };
  return res.status(status).send(errObj);
}

function generateAndSendAppErrorResponse(err, res, req) {
  switch (err.reason) {
    case ErrorType.invalid_request:
      return generateErrorResponse(err, 400, req, res);

    case ErrorType.not_found:
      return generateErrorResponse(err, 404, req, res);

    case ErrorType.Forbidden:
      return generateErrorResponse(err, 403, req, res);

    case ErrorType.unauthorized:
      return generateErrorResponse(err, 401, req, res);

    case ErrorType.conflict:
      return generateErrorResponse(err, 409, req, res);

    case ErrorType.validation_error:
      return generateErrorResponse(err, 400, req, res);

    case ErrorType.TEMP_STATUS:
      return generateErrorResponse(err, 205, req, res);

    case ErrorType.unknown_error:
    default:
      logger.error(`${500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      err.message = i18n.__('common').internalServerError;
      // err.message = err.errors[0].message;
      return generateErrorResponse(err, 500, req, res);
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (err, req, res, next) {
  // Do something more with the error here...
  return generateAndSendAppErrorResponse(err, res, req);
}