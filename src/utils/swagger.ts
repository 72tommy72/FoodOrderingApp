//@ts-ignore
import swaggerJSDoc from 'swagger-jsdoc';
// import { swaggerPaths } from './docs';
import authDocs from '../docs/auth.docs';
import { productDocs } from '../docs/product.docs';
import { orderDocs } from '../docs/order.docs';
import { couponDocs } from '../docs/coupon.docs';
import { categoryDocs } from '../docs/category.docs';
import {reviewDocs} from '../docs/reviews.docs';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Commerce API',
            version: '1.0.0',
            description: 'API documentation for the E-commerce project',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
        paths: {
            ...authDocs,
            ...productDocs,
            ...orderDocs,
            ...couponDocs,
            ...categoryDocs,
            ...reviewDocs,
        },
    },
    apis: [

    ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
