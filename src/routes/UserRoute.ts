import { Router } from 'express';

import { AuthController } from '../controllers/AuthController';
import { UserController } from '../controllers/userController';

const userController = new UserController();
const authController = new AuthController();

const routes = Router();

routes.post('/user', userController.store);
routes.get('/user', userController.findByToken);

routes.post('/forgot-password', userController.forgotPassowrd);

routes.get('/forgot-password', authController.validateToken);

routes.post('/reset-password', userController.resetPassowrd);
export default routes;
