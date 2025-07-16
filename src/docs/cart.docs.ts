export const cartDocs = {
    '/api/cart': {
        get: {
            tags: ['Cart'],
            summary: 'Get user cart',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Cart fetched successfully',
                    content: {
                        'application/json': {
                            example: {
                                success: true,
                                message: 'Cart retrieved successfully',
                                data: {
                                    cartItems: [
                                        {
                                            productId: '123',
                                            quantity: 2,
                                        },
                                    ],
                                },
                            },
                        },
                    },
                },
            },
        },
    },

    '/api/cart/add-to-cart': {
        post: {
            tags: ['Cart'],
            summary: 'Add item to cart',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                productId: { type: 'string' },
                                quantity: { type: 'number' },
                            },
                        },
                        example: {
                            productId: '123456',
                            quantity: 1,
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Item added to cart',
                },
            },
        },
    },

    '/api/cart/update-cart': {
        post: {
            tags: ['Cart'],
            summary: 'Update item quantity in cart',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            productId: '123456',
                            quantity: 3,
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Cart updated successfully',
                },
            },
        },
    },

    '/api/cart/remove-cart': {
        post: {
            tags: ['Cart'],
            summary: 'Remove item from cart',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            productId: '123456',
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Item removed from cart',
                },
            },
        },
    },

    '/api/cart/clear-cart': {
        post: {
            tags: ['Cart'],
            summary: 'Clear all items from cart',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Cart cleared successfully',
                },
            },
        },
    },

    '/api/cart/apply-coupon': {
        post: {
            tags: ['Cart'],
            summary: 'Apply coupon to cart',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            couponCode: 'SUMMER50',
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Coupon applied successfully',
                },
            },
        },
    },

    '/api/cart/checkout': {
        post: {
            tags: ['Cart'],
            summary: 'Checkout cart and create order',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Order created successfully',
                },
            },
        },
    },
};
