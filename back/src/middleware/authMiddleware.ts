// Create a middleware to check for cookies and that the token is valid.
// Pass it to the KOA context
// Use AsyncLocalStorage from Node.js to store it in the request session
import Koa from 'koa';
import { AsyncLocalStorage } from 'async_hooks';
import jwt, { Secret } from 'jsonwebtoken';

const asyncLocalStorage = new AsyncLocalStorage();

const authMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
  asyncLocalStorage.run(ctx, async () => {
    const token = ctx.cookies.get('token');
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY as Secret);
        ctx.state.user = decodedToken;
      } catch (error) {
        console.error('Invalid token', error);
        ctx.throw(401, 'Invalid token');
      }
    }
    await next();
  });
};

export default authMiddleware;
