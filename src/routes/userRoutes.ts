// src/routes/userRoutes.ts

import Router from 'koa-router';
import { registerUser, getUsers, updateUser, deleteUser, getUserByMobileAndPassword } from '../controllers/userController';

const router = new Router({
  prefix: '/v1/users' // Setting a prefix for all routes in this router
});

const routes = [
  {
    method: 'get',
    path: '/',
    handler: getUsers
  },
  {
    method: 'post',
    path: '/',
    handler: registerUser
  },
  {
    method: 'get',
    path: '/find',
    handler: getUserByMobileAndPassword
  },
  {
    method: 'put',
    path: '/:id',
    handler: updateUser
  },
  {
    method: 'delete',
    path: '/:id',
    handler: deleteUser
  }
];

routes.forEach(route => {
  (router as any)[route.method](route.path, route.handler);
});

export default router;
