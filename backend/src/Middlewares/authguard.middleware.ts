import { Authentication, JWTAuthImpl } from './../Services/authentication.service';
import { NextFunction, Request, Response } from "express";

export interface AuthGuard{
    protect(request: Request, response: Response, next: NextFunction): any
}

interface Validation {
    valid?: Boolean
    expired?: Boolean
    data?: any
}

export class AuthGuardImpl implements AuthGuard{
    
    constructor(
        private authenticator: Authentication
    ){}

    public protect(request: Request, response: Response, next: NextFunction){
        const token = request.headers['authorization'] as string
        if (!token) return response.status(403).end()
        const formated_token = token.split(' ')[1]

        const validation: Validation = this.authenticator.verifyToken(formated_token) as Validation
        console.log(validation)
        if (!validation) {
        return response.status(403).end()
        }
        if (validation.valid == false){
            console.log('invalid')
            return response.status(403).end()
        } else if (validation.expired == true){
            console.log('expired') 
            // TODO: implement refresh token
            return response.status(403).end()
        } else {
            response.locals.user_id = validation.data.user.id
            return next()
        }
    }
}