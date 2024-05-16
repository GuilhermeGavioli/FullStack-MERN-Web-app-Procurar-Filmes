import { UserService } from '../Services/user.service'
import { Request, Response } from 'express';
import { Authentication } from '../Services/authentication.service';
import { Validator } from '../Services/validator.service';
import { MongoUser } from '../DTOS/user.dto';


export interface UserController{
    authGoogle(request: Request, response: Response): Promise<any>;
    getUserInfo(request: Request, response: Response): Promise<any>
}

export class UserControllerImpl implements UserController{

    constructor(
        private userService: UserService,
        private authenticator: Authentication,
        private validator: Validator
    ){}

    public async authGoogle(request: Request, response: Response): Promise<any>{
        const oauth_access_token: any = request.params.oauth_access_token
        console.log(oauth_access_token)
        const is_oauth_token_valid = this.validator.validateOAuthToken(oauth_access_token)
        if (!is_oauth_token_valid) {
            return response.status(404).end()
        } else {
            const user = await this.authenticator.getUserInfoFromOAuthAccessToken(oauth_access_token)
            if (!user){
                console.log('invalid oauth')
                return response.status(404).end()
            }
            const user_id = await this.userService.createUserIfNecessary(user)
            if (!user_id) return response.status(404).end()
            const access_token = this.authenticator.generateToken({...user, id: user_id})
            response.json({ access_token })
        }
    }


    public async getUserInfo(request: Request, response: Response): Promise<any>{
        const user_id = response.locals.user_id
        const user = await this.userService.getUser(user_id)
        if (!user) return response.status(404).end()
        return response.json(user).end()
    }

}

