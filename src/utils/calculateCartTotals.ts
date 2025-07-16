export function calculateCartTotals(cart: any) {
    const totalBefore = cart.items.reduce((acc: number, item: any) => {
        return acc + item.product.price * item.quantity;
    }, 0);

    let discount = 0;
    if (cart.coupon) {
        if (cart.coupon.discountType === "percentage") {
            discount = totalBefore * (cart.coupon.discountValue / 100);
        } else if (cart.coupon.discountType === "fixed") {
            discount = cart.coupon.discountValue;
        }
    }

    const totalAfter = totalBefore - discount;

    return { totalBefore, discount, totalAfter };
}
