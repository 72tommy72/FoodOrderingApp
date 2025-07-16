import authRouter from './modules/Auth/auth.router';
import productsRouter from './modules/Product/product.router';
import categoryiesRouter from './modules/Category/category.router';
import cartRouter from './modules/Cart/cart.router';
import orderRouter from './modules/Order/order.router';
import couponRouter from './modules/Coupon/coupon.router';
import reviewsRouter from './modules/Reviews/reviews.router';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// @ts-ignore
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
// @ts-ignore
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './utils/swagger';
const app = express();

// 📦 Middlewares
app.use(helmet());                      // Protect headers
app.use(cors());                        // Enable CORS
app.use(express.json());                // Parse body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());                // Parse cookies
app.use(mongoSanitize());               // Prevent NoSQL Injection
app.use(xss());                         // Prevent XSS Attacks
app.use(morgan(process.env.ENVIRONMENT === 'development' ? 'dev' : 'combined'));          
// 🚫 Limiter (example: 100 requests per 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

// 📚 Routes
//user Router
app.use('/auth', authRouter);
//products Router
app.use('/products', productsRouter);
//categoryies Router
app.use('/categoryies', categoryiesRouter);
//cart Router
app.use('/cart', cartRouter);
//order Router
app.use('/order', orderRouter);
//coupon Router
app.use('/coupon', couponRouter);
//reviews Router
app.use('/reviews', reviewsRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// 📛 Not Found Handler
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'Page Not Found' });
});
// @ts-ignore
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
});

export default app;

app.get('/:id(\\d+)', (req: Request, res: Response) => {
    res.status(404).json({ message: 'Handler not implemented' });
})  // Specify clear pattern for parameters
