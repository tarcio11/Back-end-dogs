import { Router } from 'express';

import { PhotoController } from '../controllers/PhotoController';

const photoController = new PhotoController();

const routes = Router();

routes.get('/photo', photoController.index);

export default routes;
