import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { userValidations } from '../user/user.validation';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(userValidations.userValidationSchema),
  authController.register,
);
authRouter.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.login,
);
authRouter.post(
  '/refreshToken',
  validateRequest(authValidation.refreshTokenValidationSchema),
  authController.refreshToken,
);

authRouter.put(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateRequest(authValidation.changePasswordValidationSchema),
  authController.changePassword,
);

export default authRouter;
