import { verifyJWTToken } from './auth';
import UserModel from '../models/users.model';
import { logger } from '../logger/Logger';

export function verifyJWT_MW(req, res, next) {
    if (req.headers && req.headers['x-access-token']) {
        verifyJWTToken(req.headers['x-access-token'])
            .then(decode => {
                UserModel.findOne({ email: decode['email'], _id: decode['id'] })
                    .then(user => {
                        if (!user) {
                            req.user = undefined;
                            next();
                        } else {
                            req.user = user;
                            next();
                        }
                    })
                    .catch(err => {
                        req.user = undefined;
                        logger.error(err);
                        next();
                    });
            })
            .catch(err => {
                logger.error(err);
                console.log("token error:", err);
                res.status(400).json({ message: 'Invalid auth token provided.' });
            });
    } else {
        req.user = undefined;
        return res.status(401).json({ success: false, message: 'Unauthorized user!' });
    }
}
