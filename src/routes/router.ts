import { Router } from 'express';

import AuthRoute from './AuthRoute';
import CommentRoute from './CommentRoute';
import PhotoRoute from './PhotoRoute';
import PostRoute from './PostRoute';
import StatsRoute from './StatsRoute';
import UserRoute from './UserRoute';

const routes = Router();

routes.use('/json/api', UserRoute);
routes.use('/json/jwt-auth/v1', AuthRoute);
routes.use('/json/jwt-auth/v1', AuthRoute);
routes.use('/json/api', PostRoute);
routes.use('/json/api', PhotoRoute);
routes.use('/json/api', CommentRoute);
routes.use('/json/api', StatsRoute);

export default routes;
