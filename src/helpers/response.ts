import { logger } from '../logger/Logger';

/**
 * sendMessage
 * @param {*} res
 * @param {*} status
 * @param {*} message
 * @returns formatted response
 */
const sendMessage = (res, req, status, message) => {
  try {
    logger.info(`${status} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.status(status).json({ status, message });
  } catch (error) {
    logger.error(`Error in response message: ${error}`);
  }
};

/**
 * sendResponse
 * @param res response object
 * @param req request object
 * @param status status code
 * @param message message
 * @param data data to response
 * @returns formatted response
 */
const sendResponse = (res, req, status, message, data) => {
  try {
    const userAgent = req.headers['user-agent'];
    const isiPhone = /iPhone/.test(userAgent);
    const isiPad = /iPad/.test(userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)/.test(userAgent);
    const isMobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(userAgent);

    const loggerSet = isiPhone ? 'iPhone' : isiPad ? 'iPad' : isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';
    logger.info(`${status} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${loggerSet}`);

    return res.status(status).json({ status, message, data });
  } catch (error) {
    logger.error(`Error in response data: ${error}`);
  }
};

export { sendMessage, sendResponse };
