import { Router } from "express";
import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { addToCart, applyCouponToCart, checkoutCart, clearCart, getCart, removeCart, updateCart } from "./cart.controller";
import { isValid } from "../../middlewares/validation.middleware";
import { addCartSchema, removeCartSchema, updateCartSchema } from "./cart.validation";

const router = Router();

/**
 * @route GET /api/cart
 * @desc Get user's cart contents
 * @access Authenticated users
 */
router.get('/', isAuthentcated, getCart);

/**
 * @route POST /api/cart/add-to-cart
 * @desc Add item to cart
 * @access Authenticated users
 */
router.post('/add-to-cart', isAuthentcated, isValid(addCartSchema), addToCart);

/**
 * @route POST /api/cart/update-cart
 * @desc Update cart item quantity
 * @access Authenticated users
 */
router.post('/update-cart', isAuthentcated, isValid(updateCartSchema), updateCart);

/**
 * @route POST /api/cart/remove-cart
 * @desc Remove item from cart
 * @access Authenticated users
 */
router.post('/remove-cart', isAuthentcated, isValid(removeCartSchema), removeCart);

/**
 * @route POST /api/cart/clear-cart
 * @desc Clear all items from cart
 * @access Authenticated users
 */
router.post('/clear-cart', isAuthentcated, clearCart);

/**
 * @route POST /api/cart/apply-coupon
 * @desc Apply coupon code to cart
 * @access Authenticated users
 */
router.post('/apply-coupon', isAuthentcated, applyCouponToCart);

/**
 * @route POST /api/cart/checkout
 * @desc Checkout cart and create order
 * @access Authenticated users
 */
router.post('/checkout', isAuthentcated, checkoutCart);

export default router;

// POST /orders/create-from-cart

// GET /orders → for user

// GET /admin/orders → for admin

// PATCH /orders/:id/status → update status (admin)

// 💳 Stripe
// POST /checkout-session → create Stripe session

// POST /webhook → Stripe webhook endpoint
// stripe.webhooks.create({
//     endpoint: '/webhook',
//     handler: async (event) => {
//       if (event.type === 'checkout.session.completed') {
//         const session = event.data.object;
//         // create order
//         // mark paymentStatus = "paid"
//       }
//     }
//   })
