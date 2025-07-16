import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Token } from "../models/token.model";
import { User } from "../modules/Auth/auth.model";
import { catchError } from "../utils/catchError";


export const isAuthentcated = catchError(async (req: Request, res: Response, next: NextFunction) => {
    //1- check if token is existence
    let token: any = req.cookies["token"];
    if (!token && !token.startsWith(process.env.BEARER_TOKEN))
        return next(new Error(" token is required or token must valid"));
    //2- check payload 
    token = token.split(process.env.BEARER_TOKEN)[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) return next(new Error("invalid token")); 
    //3- check token in DB
    const tokenDB = await Token.findOne({ token, isValid: true });
    if (!tokenDB) return next(new Error("token expired"));
    //4- check user
    const user = await User.findOne({ email: (decoded as {email: string}).email });
    if (!user) return (new Error("User not found"));
    //5- pass user
    (req as any).user = user;
    //6- return next
    return next();

})