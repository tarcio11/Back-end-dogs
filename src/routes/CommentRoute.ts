import { Router } from 'express';

import { CommentController } from '../controllers/CommentController';

const commentController = new CommentController();

const routes = Router();

routes.get('/comment/:id', commentController.index);
routes.post('/comment/:id', commentController.create);

export default routes;
