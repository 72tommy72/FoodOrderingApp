import { catchError } from "../../utils/catchError";
import * as orderService from "./order.service";

/**
 * Order Controller
 * Handles all order-related HTTP requests
 */

/**
 * Get all orders
 * @param req Request object
 * @param res Response object
 * @returns List of orders with status code
 */
export const getOrders = catchError(async (req, res) => {
    const orders = await orderService.getOrdersService(req as any);
    return res.status(orders.statusCode).json(orders.data);
});

/**
 * Get single order by ID
 * @param req Request object
 * @param res Response object  
 * @returns Single order with status code
 */
export const getOrder = catchError(async (req, res) => {
    const order = await orderService.getOrderService(req as any);
    return res.status(order.statusCode).json(order.data);
});

/**
 * Create new order
 * @param req Request object
 * @param res Response object
 * @returns Created order with status code
 */
export const addOrder = catchError(async (req, res) => {
    const order = await orderService.addOrderService(req as any);
    return res.status(order.statusCode).json(order.data);
});

/**
 * Create new order with Stripe payment
 * @param req Request object
 * @param res Response object
 * @returns Created order with payment details and status code
 */
export const addOrderWithStripe = catchError(async (req, res) => {
    const order = await orderService.addOrderWithStripeService(req as any, res as any);
    return res.status(order.statusCode).json(order.data);
});
