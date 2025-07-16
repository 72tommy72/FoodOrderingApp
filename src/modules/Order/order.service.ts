import { calculateCartTotals } from "../../utils/calculateCartTotals";
import { Order } from "./order.model";
import { Cart } from "../../modules/Cart/cart.model";
import Stripe from "stripe";

export const getOrdersService = async (req: Request) => {
    const userId = (req as any).user._id;
    const order = await Order.find({ userId }, { items: 1, totalPrice: 1 })
    return {
        statusCode: 200,
        data: { success: true, order },
    }
}
export const getOrderService = async (req: Request) => {
    const userId = (req as any).user._id;
    const orderId = (req as any).params.id;
    if (!orderId) {
        return {
            statusCode: 400,
            data: { success: false, message: "OrderId id is required" },
        }
    }
    const order = await Order.find({ userId, _id: orderId }, { items: 1, totalPrice: 1 })
    if (!order) {
        return {
            statusCode: 404,
            data: { success: false, message: "Order not found" },
        }
    }
    return {
        statusCode: 200,
        data: { success: true, order },
    }
}

export async function addOrderService(req: Request) {
    const userId = (req as any).user._id;
    const { shippingAddress } = (req as any).body;
    if (!shippingAddress) {
        return {
            statusCode: 400,
            data: { success: false, message: "Shipping address is required" },
        }
    }

    // 1. جلب السلة
    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart || (cart as any).items.length === 0) {
        return {
            statusCode: 400,
            data: { success: false, message: "Cart is empty" },
        };
    }

    // 2. حساب الإجمالي
    const { totalAfter, discount } = calculateCartTotals(cart);

    // 3. إنشاء الطلب
    const newOrder = await Order.create({
        userId,
        items: cart.items.map((item: any) => ({
            product: item.product._id,
            quantity: item.quantity,
        })),
        totalPrice: totalAfter,
        coupon: cart.coupon?.code
            ? {
                code: cart.coupon.code,
                discount: discount,
            }
            : undefined,
        shippingAddress,
        paymentMethod: "cash",
        paymentStatus: "unpaid", // لأنه لسه ما دفعش
        orderStatus: "pending",
    });

    // 4. تفريغ السلة
    (cart as any).items = [];
    (cart as any).coupon = undefined;
    await cart.save();

    return {
        statusCode: 201,
        data: {
            success: true,
            message: "Order created successfully",
            order: newOrder,
        },
    };
}
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function addOrderWithStripeService(req: Request, res: Response) {
    let order 
    const sig = (req as any).headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
        event = Stripe.webhooks.constructEvent((req as any).body, sig, endpointSecret);
    } catch (err: any) {
        return {
            statusCode: 400,
            data: {
                success: false,
                message: `Webhook Error: ${err.message}`,
            }
        }
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const cartId = session.metadata?.cartId;
        const couponCode = session.metadata?.coupon || "";
        const discount = parseFloat(session.metadata?.discount || "0");

        // جلب الكارت
        const cart = await Cart.findById(cartId).populate("items.product");

        if (!cart || (cart as any).items.length === 0) {
            return {
                statusCode: 404,
                data: { success: false, message: "Cart not found or empty" },
            }
        }

        const { totalAfter } = calculateCartTotals(cart);

        order = await Order.create({
            userId,
            items: cart.items.map((item: any) => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
            totalPrice: totalAfter,
            coupon: couponCode
                ? {
                    code: couponCode,
                    discount,
                }
                : undefined,
            shippingAddress: "From Stripe - TBD",
            paymentMethod: "stripe",
            paymentStatus: "paid",
            orderStatus: "processing",
        });

        // تفريغ الكارت
        (cart as any).items = [];
        (cart as any).coupon = undefined;
        await cart.save();
    }

    return {
        statusCode: 200,
        data: {
            success: true,
            message: "Order created successfully",
            order
        },
    }
}