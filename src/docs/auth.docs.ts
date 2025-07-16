const authDocs = {
    "/auth/register": {
        post: {
            tags: ["Auth"],
            summary: "Register new user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["name", "email", "password"],
                            properties: {
                                name: { type: "string" },
                                email: { type: "string", format: "email" },
                                password: { type: "string", minLength: 6 }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "User registered successfully"
                },
                400: {
                    description: "Validation error"
                }
            }
        }
    },
    "/auth/confirm-email/{activationCode}": {
        get: {
            tags: ["Auth"],
            summary: "Activate user account via email confirmation",
            parameters: [
                {
                    name: "activationCode",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Account activated successfully"
                },
                400: {
                    description: "Invalid or expired activation code"
                }
            }
        }
    },
    "/auth/login": {
        post: {
            tags: ["Auth"],
            summary: "Authenticate user & get token",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["email", "password"],
                            properties: {
                                email: { type: "string", format: "email" },
                                password: { type: "string" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Login successful"
                },
                401: {
                    description: "Invalid credentials"
                }
            }
        }
    },
    "/auth/forget-password": {
        patch: {
            tags: ["Auth"],
            summary: "Send password reset email",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["email"],
                            properties: {
                                email: { type: "string", format: "email" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Reset email sent"
                },
                400: {
                    description: "Email not found"
                }
            }
        }
    },
    "/auth/reset-password": {
        patch: {
            tags: ["Auth"],
            summary: "Reset user password",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["token", "newPassword"],
                            properties: {
                                token: { type: "string" },
                                newPassword: { type: "string", minLength: 6 }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Password reset successful"
                },
                400: {
                    description: "Invalid token or password"
                }
            }
        }
    },
    "/auth/me": {
        get: {
            tags: ["Auth"],
            summary: "Get current user profile",
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "User info retrieved successfully"
                },
                401: {
                    description: "Unauthorized"
                }
            }
        }
    },
    "/auth": {
        get: {
            tags: ["Auth"],
            summary: "Logout user",
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "Logout successful"
                },
                401: {
                    description: "Unauthorized"
                }
            }
        }
    }
};

export default authDocs;
