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
    private authenticator: Authentication = new JWTAuthImpl()

    constructor(
    ){}

    public protect(request: Request, response: Response, next: NextFunction){
        console.log('running auth guard')
        console.log(request.headers)
        const token = request.headers['authorization'] as string
            console.log(token)
        if (!token)  return response.status(404).end()
        const formated_token = token.split(' ')[1]

        const validation: Validation = this.authenticator.verifyToken(formated_token) as Validation
        if (validation.valid == false){
            console.log('invalid')
        } else if (validation.expired == true){
            console.log('expired') // refresh
        } else {
            // response.locals.user_id = validation.data.
            console.log(validation.data)
        }
        return response.json()

        console.log(JSON.stringify(request.headers));
        if (!token) {
            return response.status(404).end()
        }
        const user = this.authenticator.verifyToken(token)
        console.log(user)
        return response.json(user)
    //   console.log(req.headers)
    //   const access_token = req.headers['authorization']
    //   console.log(access_token)
    //   const is_valid = Auth.verify(access_token)
    //   console.log(is_valid)
    //   if (!is_valid)return res.status(400).end()
    //   return res.json({ token_info: is_valid })
        next()
    }

}