export const productDocs = {
    '/products': {
        get: {
            tags: ['Products'],
            summary: 'Get all products',
            responses: {
                200: {
                    description: 'List of products retrieved successfully',
                    content: {
                        'application/json': {
                            example: {
                                success: true,
                                data: [
                                    {
                                        _id: 'prod123',
                                        title: 'Laptop',
                                        price: 2500,
                                        description: 'Powerful laptop',
                                        stock: 5,
                                        category: 'Electronics',
                                        image: 'http://example.com/laptop.jpg',
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
    },

    '/products/{id}': {
        get: {
            tags: ['Products'],
            summary: 'Get product by ID',
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
                    description: 'Product fetched successfully',
                    content: {
                        'application/json': {
                            example: {
                                success: true,
                                data: {
                                    _id: 'prod123',
                                    title: 'Laptop',
                                    price: 2500,
                                    description: 'Powerful laptop',
                                    stock: 5,
                                },
                            },
                        },
                    },
                },
                404: { description: 'Product not found' },
            },
        },
    },

    '/products/addProduct': {
        post: {
            tags: ['Products'],
            summary: 'Create new product',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                title: { type: 'string' },
                                description: { type: 'string' },
                                price: { type: 'number' },
                                stock: { type: 'integer' },
                                category: { type: 'string' },
                                productImage: { type: 'string', format: 'binary' },
                            },
                            required: ['title', 'price', 'stock', 'category'],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Product created successfully',
                },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
            },
        },
    },

    '/products/update/{id}': {
        patch: {
            tags: ['Products'],
            summary: 'Update product',
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
                required: false,
                content: {
                    'application/json': {
                        example: {
                            title: 'Updated Product',
                            price: 3000,
                            stock: 10,
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Product updated' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                404: { description: 'Product not found' },
            },
        },

        delete: {
            tags: ['Products'],
            summary: 'Delete product',
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
                200: { description: 'Product deleted successfully' },
                401: { description: 'Unauthorized' },
                404: { description: 'Product not found' },
            },
        },
    },
};
