import express, { Router } from "express";
import { isAuthentcated } from "../../middlewares/authentication.middleware"
import { addOrder, addOrderWithStripe, getOrder, getOrders } from "./order.controller"

const router = Router()

/**
 * @route GET /orders
 * @desc Get all orders for authenticated user
 * @access Private
 */
router.get("/", isAuthentcated, getOrders)

/**
 * @route GET /orders/:id
 * @desc Get specific order by ID
 * @access Private
 */
router.get("/:id", isAuthentcated, getOrder)

/**
 * @route POST /orders/manual
 * @desc Create manual order (without Stripe)
 * @access Private
 */
router.post("/manual", isAuthentcated, addOrder)

/**
 * @route POST /webhook
 * @desc Handle Stripe webhook and create order
 * @access Public
 */
router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    addOrderWithStripe
);

export default router
