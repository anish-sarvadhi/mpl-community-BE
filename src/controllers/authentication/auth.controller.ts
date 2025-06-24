import db from '../../models';
import bcrypt from 'bcrypt'; 
import { createJWToken, verifyJWTToken } from '../../config/auth';

import { logger } from '../../logger/Logger';
import { Sequelize } from 'sequelize';

import { ErrorType } from '../../utils/errorTypes';
import appError from '../../utils/errorHelper';
import { sendResponse } from '../../helpers/response';

export class AuthController {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = db.sequelize;
  }

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body.data;

      if (!email) {
        throw new appError("Email is required", ErrorType.not_found);
      }
      if (!password) {
        throw new appError("Password is required", ErrorType.bad_request);
      }

      const models = db as any;

      const user = await models.users.findOne({
        where: { email },
      });

      if (!user) {
        throw new appError("Email not found", ErrorType.not_found);
      }

      if (!user.authenticate(password)) {
        throw new appError("Incorrect password", ErrorType.unauthorized);
      }

      const token = createJWToken({ id: user.id, email: user.email });

      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token expires in 24 hrs

      await models.user_token.create({
        user_id: user.id,
        token,
        expires_at: expiresAt,
      });

      logger.info(`User ${user.email} logged in successfully.`);

      return sendResponse(res, req, 200, "Login successful", {
        data: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          user_name: user.user_name,
          email: user.email,
          token,
        },
      });
    } catch (error) {
      logger.error('Login failed:', error);
      return next(error);
    }
  };

  verifyToken = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new appError('Token is required', ErrorType.unauthorized);
      }

      const decoded: any = await verifyJWTToken(token);

      const userId = decoded?.id || decoded?.data?.id;

      if (!userId) {
        throw new appError('Invalid token payload', ErrorType.unauthorized);
      }

      const models = db as any;

      const user = await models.users.findOne({
        where: { id: userId },
        attributes: ['id', 'first_name', 'last_name', 'email', 'user_name'],
      });

      if (!user) {
        throw new appError('User not found', ErrorType.not_found);
      }

      const tokenRecord = await models.user_token.findOne({
        where: { user_id: userId, token },
      });

      if (!tokenRecord) {
        throw new appError('Token invalid or revoked', ErrorType.unauthorized);
      }

      if (new Date(tokenRecord.expires_at) < new Date()) {
        throw new appError('Token has expired', ErrorType.unauthorized);
      }

      return sendResponse(res, req, 200, 'Token is valid', {
        user,
        tokenPayload: decoded,
      });
    } catch (error) {
      logger.error('Token verification failed:', error);
      return next(new appError('Invalid or expired token', ErrorType.unauthorized));
    }
  };
}
