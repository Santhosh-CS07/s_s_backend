import Router from 'koa-router';
import UserController from '../controllers/userController';

const router = new Router({
    prefix: '/users'
});

router.get('/getUser', UserController.getUser);
router.post('/create', UserController.createUser);

export default router;
