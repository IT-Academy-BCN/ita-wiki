import Router from '@koa/router';

import authRouter from './auth.router';
//...

const router = new Router();

router.use(authRouter.routes(), authRouter.allowedMethods())
//...

export default router 