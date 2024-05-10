import { Request, Response } from 'express';
import { Authentication, authentication } from '../Services/Auth';
import { Validator, validator } from '../Services/Validator';
import {OAuth2Client}  from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_SECRET_KEY)

interface UserController{
    authGoogle(request: Request, response: Response): Promise<any>;
}


class UserControllerImpl implements UserController{

    constructor(
        private authentication: Authentication,
        private validator: Validator
    ){}

    public async authGoogle(request: Request, response: Response): Promise<any>{
        const oauth_access_token: any = request.query.oauth_access_token
        
        const is_oauth_token_valid = this.validator.validateOAuthToken(oauth_access_token)
        
        if (!is_oauth_token_valid) {
            response.status(404).end()
        } else {
            const user = await this.authentication.getUserInfoFromOAuthAccessToken(oauth_access_token)
            if (!user){
                response.status(404).end()
            }
            const access_token = this.authentication.generateToken(user)
            response.json({ access_token })
        }
    }

}

const userController: UserControllerImpl = new UserControllerImpl(authentication, validator)
export { userController }