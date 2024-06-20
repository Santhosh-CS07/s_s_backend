import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import userRoutes from './routes/userRoutes';
import client from './models/db';
import cors from '@koa/cors'; // Import the CORS middleware

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

const PORT = process.env.PORT || 3001;

client.connect().then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.log('Error connecting to the database', error);
});
