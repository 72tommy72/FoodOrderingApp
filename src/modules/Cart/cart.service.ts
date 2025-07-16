import { Request } from "express";
import { Cart } from "./cart.model";
import { Product } from "../../modules/Product/product.model";
import { calculateCartTotals } from "../../utils/calculateCartTotals";
import { Coupon } from "../../modules/Coupon/coupon.model";
import Stripe from "stripe";


export async function getCartService(req: Request) {
    const userId = (req as any).user._id;

    let cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart) {
        cart = await Cart.create({ userId });
        return {
            statusCode: 200,
            data: { success: true, cart, totalBefore: 0, discount: 0, totalAfter: 0 },
        };
    }

    const { totalBefore, discount, totalAfter } = calculateCartTotals(cart);

    return {
        statusCode: 200,
        data: {
            success: true,
            cart,
            totalBefore,
            discount,
            totalAfter,
        },
    };
}
export async function addToCartService(req: Request) {
    const userId = (req as any).user._id;
    const { productId, quantity = 1 } = req.body;

    if (quantity <= 0)
        return {
            statusCode: 400,
            data: { success: false, message: "Invalid quantity" },
        };

    // check product
    const checkProduct = await Product.findOne({
        _id: productId,
        available: true,
    });
    if (!checkProduct)
        return {
            statusCode: 404,
            data: { success: false, message: "Product not found" },
        };

    if (quantity > checkProduct.quantity)
        return {
            statusCode: 400,
            data: { success: false, message: "Quantity is not available" },
        };

    // check cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = await Cart.create({
            userId,
            items: [{ product: productId, quantity }],
        });
    } else {
        const existingItem = cart.items.find(
            (item: any) => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
    }

    return {
        statusCode: 200,
        data: { success: true, cart },
    };
}
export async function updateCartService(req: Request) {
    const userId = (req as any).user._id;
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    const item = (cart as any).items.find(
        (cartItem: { product: string; quantity: number }) =>
            cartItem.product.toString() === productId
    );
    if (!item) {
        return {
            statusCode: 404,
            data: { success: false, message: "Product not found in cart" },
        };
    }
    if (quantity <= 0) {
        (cart as any).items = (cart as any).items.filter(
            (item: { product: string; quantity: number }) =>
                item.product.toString() !== productId
        );
    } else {
        item.quantity = quantity;
    }
    await (cart as any).save();
    return {
        statusCode: 200,
        data: { success: true, cart },
    };
}
export async function removeCartService(req: Request) {
    const userId = (req as any).user._id;
    const productId = req.params.productId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        return {
            statusCode: 404,
            data: { success: false, message: "Cart not found" },
        };
    }
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (!existingItem) {
        return {
            statusCode: 404,
            data: { success: false, message: "Item not found in cart" },
        };
    }

    (cart as any).items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();

    return {
        statusCode: 200,
        data: { success: true, cart },
    };
};
export async function clearCartService(req: Request) {
    const userId = (req as any).user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return {
            statusCode: 404,
            data: { success: false, message: "Cart not found" },
        };
    }
    (cart as any).items = [];
    await cart.save();
    return {
        statusCode: 200,
        data: { success: true, cart },
    };
}
export const applyCouponToCartService = async (req: Request) => {
    const userId = (req as any).user._id;
    const { code } = req.body;

    if (!code) {
        return {
            statusCode: 400,
            data: { success: false, message: "Coupon code is required" },
        };
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) {
        return {
            statusCode: 404,
            data: { success: false, message: "Coupon not found or inactive" },
        };
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
        return {
            statusCode: 400,
            data: { success: false, message: "Coupon has expired" },
        };
    }

    const cart = await Cart.findOne({ userId }).populate("items.product");
    if (!cart || (cart as any).items.length === 0) {
        return {
            statusCode: 400,
            data: { success: false, message: "Cart is empty" },
        };
    }

    // حساب السعر الإجمالي
    const totalBefore = cart.items.reduce((acc, item: any) => {
        return acc + item.product.price * item.quantity;
    }, 0);

    if (coupon.minAmount && totalBefore < coupon.minAmount) {
        return {
            statusCode: 400,
            data: { success: false, message: `Coupon requires minimum order of ${coupon.minAmount}` },
        };
    }

    // حساب الخصم
    let discount = 0;
    if (coupon.discountType === "percentage") {
        discount = totalBefore * (coupon.discountValue / 100);
    } else if (coupon.discountType === "fixed") {
        discount = coupon.discountValue;
    }

    const totalAfter = totalBefore - discount;

    // تحديث السلة
    cart.coupon = {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue
    };
    cart.totalPrice = totalAfter;
    await cart.save();

    return {
        statusCode: 200,
        data: {
            success: true,
            message: "Coupon applied successfully",
            discount,
            totalBefore,
            totalAfter,
            cart
        }
    };
};

export async function checkoutCartService(req: Request) {
    const userId = (req as any).user._id;

    // 1. جلب السلة
    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart || (cart as any).items.length === 0) {
        return {
            statusCode: 400,
            data: { success: false, message: "Cart is empty" },
        };
    }

    // 2. حساب السعر الكلي والخصم (لو فيه كوبون)
    const { totalBefore, discount, totalAfter } = calculateCartTotals(cart);

    // 3. بناء line_items (المنتجات)
    const lineItems = cart.items.map((item: any) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.product.name,
            },
            unit_amount: Math.round(item.product.price * 100), // السعر بالسنت
        },
        quantity: item.quantity,
    }));


    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2025-05-28.basil",
    });

    // 4. إنشاء جلسة الدفع في Stripe
    const session = await stripe.checkout.sessions.create({

        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
        metadata: {
            userId: userId.toString(),
            cartId: (cart as any)._id.toString(),
            coupon: cart.coupon?.code || "",
            discount: discount.toString(),
        },
    } as any);

    return {
        statusCode: 200,
        data: {
            success: true,
            url: session.url,
        },
    };
}
