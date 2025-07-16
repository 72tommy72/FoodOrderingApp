export const categoryDocs = {
    '/api/categories': {
        get: {
            tags: ['Category'],
            summary: 'Get all categories',
            responses: {
                200: {
                    description: 'Categories retrieved successfully',
                    content: {
                        'application/json': {
                            example: {
                                success: true,
                                message: 'All categories fetched',
                                data: [
                                    {
                                        _id: 'abc123',
                                        name: 'Electronics',
                                        image: 'https://example.com/image.jpg',
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
        post: {
            tags: ['Category'],
            summary: 'Create a new category',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                },
                                categoryImage: {
                                    type: 'string',
                                    format: 'binary',
                                },
                            },
                            required: ['name', 'categoryImage'],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Category created successfully',
                },
                400: {
                    description: 'Validation error',
                },
                401: {
                    description: 'Unauthorized',
                },
                403: {
                    description: 'Forbidden',
                },
            },
        },
    },

    '/api/categories/{id}': {
        get: {
            tags: ['Category'],
            summary: 'Get category by ID',
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
                    description: 'Category found',
                },
                404: {
                    description: 'Category not found',
                },
            },
        },
        patch: {
            tags: ['Category'],
            summary: 'Update category by ID',
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
                            name: 'Updated Category Name',
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Category updated',
                },
                404: {
                    description: 'Category not found',
                },
            },
        },
        delete: {
            tags: ['Category'],
            summary: 'Delete category by ID',
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
                    description: 'Category deleted successfully',
                },
                404: {
                    description: 'Category not found',
                },
            },
        },
    },
};
