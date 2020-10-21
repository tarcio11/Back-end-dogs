import { Router } from 'express';
import multer from 'multer';

import { multerConfig } from '../config/MulterConfig';
import { PostController } from '../controllers/PostController';

const postController = new PostController();

const routes = Router();

// routes.get('/photo/:id', postController.index);
routes.post(
  '/photo',
  multer(multerConfig).single('file'),
  postController.create
);
routes.get('/photo/:id', postController.index);
routes.delete('/photo/:id', postController.delete);

export default routes;
