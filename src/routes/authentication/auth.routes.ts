import { loginSchema } from '../../validation/user.validation';
import { verifyJWT_MW } from '../../config/middlewares';
import { END_POINT } from '../../constant/endpoint';
import { AuthController } from '../../controllers/authentication';


export function initAuthRoutes(app, router) {
  const authRoute = router;
  const authController = new AuthController();

  authRoute.post(END_POINT.LOGIN,loginSchema, authController.login); 

  authRoute.get(END_POINT.VERIFY_JWT,authController.verifyToken);

  router.post('/test-login', authController.login);

  return authRoute;
}
