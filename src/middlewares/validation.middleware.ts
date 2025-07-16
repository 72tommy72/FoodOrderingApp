import { NextFunction, Request, Response } from 'express';
import joi from 'joi'
import { Types } from "mongoose";

export const isValidIdObject = (value: any, helper: any): boolean | any => {
    return Types.ObjectId.isValid(value) ? true : helper.message("Invalid objectId");
}

export const isValid = (schema: joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Combine request data from body, params and query
        const copyReq = { ...req.body, ...req.params, ...req.query };

        // Validate data against schema
        const validationResult = schema.validate(copyReq, { abortEarly: false });
        
        if (validationResult.error) {
            const messages = validationResult.error.details.map(error => error.message);
            return next(new Error(`Validation error: ${messages}`));
        }
        
        return next();
    }
}