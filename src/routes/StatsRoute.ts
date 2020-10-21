import { Router } from 'express';

import { StatsController } from '../controllers/StatsController';

const statsController = new StatsController();

const routes = Router();

routes.get('/stats', statsController.index);

export default routes;
