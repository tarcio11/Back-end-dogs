import { Router } from 'express';

import { AuthController } from '../controllers/AuthController';

const authController = new AuthController();

const routes = Router();

routes.post('/token', authController.signIn);
routes.get('/token', authController.validateToken);

export default routes;
