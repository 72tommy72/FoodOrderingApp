export const couponDocs = {
    '/coupon': {
        get: {
            tags: ['Coupon'],
            summary: 'Get all coupons',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'All coupons retrieved successfully',
                    content: {
                        'application/json': {
                            example: {
                                success: true,
                                message: 'Coupons fetched',
                                data: [
                                    {
                                        _id: 'abc123',
                                        code: 'DISCOUNT20',
                                        discount: 20,
                                        expireDate: '2025-12-31T00:00:00Z',
                                    },
                                ],
                            },
                        },
                    },
                },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden' },
            },
        },
        post: {
            tags: ['Coupon'],
            summary: 'Create a new coupon',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            code: 'DISCOUNT20',
                            discount: 20,
                            expireDate: '2025-12-31T00:00:00Z',
                        },
                    },
                },
            },
            responses: {
                201: { description: 'Coupon created successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden' },
            },
        },
    },

    '/coupon/{id}': {
        get: {
            tags: ['Coupon'],
            summary: 'Get coupon by ID',
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
                    description: 'Coupon fetched successfully',
                },
                404: {
                    description: 'Coupon not found',
                },
            },
        },
        patch: {
            tags: ['Coupon'],
            summary: 'Update coupon by ID',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            requestBody: {
                content: {
                    'application/json': {
                        example: {
                            code: 'NEWCODE',
                            discount: 25,
                            expireDate: '2026-01-01T00:00:00Z',
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Coupon updated successfully',
                },
                404: {
                    description: 'Coupon not found',
                },
            },
        },
        delete: {
            tags: ['Coupon'],
            summary: 'Delete coupon by ID',
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
                    description: 'Coupon deleted successfully',
                },
                404: {
                    description: 'Coupon not found',
                },
            },
        },
    },
};
