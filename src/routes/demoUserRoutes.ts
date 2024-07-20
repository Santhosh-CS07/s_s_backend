
import Router from 'koa-router';
import { createDemoUsers } from '../controllers/DemoUserController';

const router = new Router({
  prefix: '/v1/demoUser' // Setting a prefix for all routes in this router
});

const routes = [
  {
    method: 'post',
    path: '/',
    handler: createDemoUsers
  }
];

routes.forEach(route => {
  (router as any)[route.method](route.path, route.handler);
});

export default router;
