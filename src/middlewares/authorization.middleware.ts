import { NextFunction, Request, Response } from "express"
import { catchError } from "../utils/catchError"

export const isAuthorized = (role : string) => {
    return catchError(async(req : Request, res : Response, next : NextFunction) =>{
        if((req as any).user?.role !== role){
            return next(new Error("you are not allowed to access this"))
        }
        return next();
    })
}