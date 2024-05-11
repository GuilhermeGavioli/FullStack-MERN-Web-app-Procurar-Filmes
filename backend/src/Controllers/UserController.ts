import { UserService } from '../Services/user.service'
import { Request, Response } from 'express';
import { Authentication } from '../Services/authentication.service';
import { Validator } from '../Services/validator.service';


export interface UserController{
    authGoogle(request: Request, response: Response): Promise<any>;
}

export class UserControllerImpl implements UserController{

    constructor(
        private userService: UserService,
        private authentication: Authentication,
        private validator: Validator
    ){}

    public async authGoogle(request: Request, response: Response): Promise<any>{
        const oauth_access_token: any = request.params.oauth_access_token
        console.log(oauth_access_token)
        const is_oauth_token_valid = this.validator.validateOAuthToken(oauth_access_token)
        if (!is_oauth_token_valid) {
            return response.status(404).end()
        } else {
            const user = await this.authentication.getUserInfoFromOAuthAccessToken(oauth_access_token)
            if (!user){
                console.log('invalid oauth')
                return response.status(404).end()
            }
            await this.userService.createUserIfNecessary(user)
            const access_token = this.authentication.generateToken(user)
            response.json({ access_token })
        }
    }

}

