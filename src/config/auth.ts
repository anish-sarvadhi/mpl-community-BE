import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { environment } from './';

dotenv.config();

const { secret } = environment;
export function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
}

export function createJWToken(payload) {
  return jwt.sign({
    data: payload
  }, secret, {
    expiresIn: '7d',
    algorithm: 'HS256'
  });
}
