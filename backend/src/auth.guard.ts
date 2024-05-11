import { NextFunction, Request, Response } from "express";

export class AuthGuard{


    public static verifyToken(request: Request, response: Response, next: NextFunction){
        console.log('running auth guard')
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