import { NextFunction, Request, Response } from "express";

export class AuthGuard{


    public static verifyToken(request: Request, response: Response, next: NextFunction){
        console.log('running auth guard')
        next()
    }

}