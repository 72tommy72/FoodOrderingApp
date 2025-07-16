import { Request, Response, NextFunction, RequestHandler } from 'express';

export const catchError = (controller: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
    return (req, res, next) => {
        controller(req, res, next).catch((error) => next(error));
    };
};
