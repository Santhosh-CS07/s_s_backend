import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import userRoutes from './routes/userRoutes';
import cors from '@koa/cors'; // Import the CORS middleware
import connectDB from './config/db';

const app = new Koa();

// Use the CORS middleware
app.use(cors());

// Middleware to respond with "ok" for the root route
app.use(async (ctx, next) => {
    if (ctx.path === '/') {
        ctx.body = { response: 'OK' };
    } else {
        await next();
    }
});

app.use(bodyParser());
app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

connectDB();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
