export const orderDocs = {
    '/orders': {
        get: {
            tags: ['Orders'],
            summary: 'Get all orders for current user',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Orders fetched successfully',
                    content: {
                        'application/json': {
                            example: {
                                success: true,
                                data: [
                                    {
                                        _id: 'order123',
                                        items: [{ productId: 'abc', quantity: 2 }],
                                        totalPrice: 100,
                                        paymentStatus: 'paid',
                                        createdAt: '2025-07-16T12:00:00Z',
                                    },
                                ],
                            },
                        },
                    },
                },
                401: { description: 'Unauthorized' },
            },
        },
    },

    '/orders/{id}': {
        get: {
            tags: ['Orders'],
            summary: 'Get order by ID',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: {
                    description: 'Order fetched successfully',
                    content: {
                        'application/json': {
                            example: {
                                success: true,
                                data: {
                                    _id: 'order123',
                                    items: [{ productId: 'abc', quantity: 2 }],
                                    totalPrice: 100,
                                    paymentStatus: 'paid',
                                },
                            },
                        },
                    },
                },
                401: { description: 'Unauthorized' },
                404: { description: 'Order not found' },
            },
        },
    },

    '/orders/manual': {
        post: {
            tags: ['Orders'],
            summary: 'Create order manually (without Stripe)',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            items: [
                                { productId: 'abc', quantity: 2 },
                                { productId: 'def', quantity: 1 },
                            ],
                            shippingAddress: '123 Main St, Cairo',
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Order created successfully',
                },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
            },
        },
    },

    '/orders/webhook': {
        post: {
            tags: ['Orders'],
            summary: 'Stripe webhook endpoint',
            description:
                'Triggered by Stripe to finalize an order after successful payment session',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { type: 'object' },
                        example: {
                            id: 'evt_1Example',
                            type: 'checkout.session.completed',
                            data: {
                                object: {
                                    id: 'cs_test_example',
                                    customer_email: 'user@example.com',
                                    amount_total: 10000,
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Webhook processed successfully',
                },
                400: { description: 'Stripe verification failed' },
            },
        },
    },
};
