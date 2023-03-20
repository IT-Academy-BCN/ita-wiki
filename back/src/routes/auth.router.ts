import Router from '@koa/router';
import {login, register, demo} from '../controllers/auth.controller';

const router = new Router({
  prefix: '/auth'
});

router.get('/demo', demo)

router.post('/login', login);
router.post('/register', register);

export default router