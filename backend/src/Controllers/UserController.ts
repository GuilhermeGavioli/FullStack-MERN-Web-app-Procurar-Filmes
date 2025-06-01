import { UserService } from '../Services/user.service'
import { Request, Response } from 'express';
import { Authentication } from '../Services/authentication.service';
import { Validator } from '../Services/validator.service';
import { MongoUser, User } from '../DTOS/user.dto';


export interface UserController{
    authGoogle(request: Request, response: Response): Promise<any>;
    authEmail(request: Request, response: Response): Promise<any>;
    getUserInfo(request: Request, response: Response): Promise<any>
    editUserName(request: Request, response: Response): Promise<any>
}

export class UserControllerImpl implements UserController{

    constructor(
        private userService: UserService,
        private authenticator: Authentication,
        private validator: Validator
    ){}

    public async authGoogle(request: Request, response: Response): Promise<any>{
        const oauth_access_token: any = request.params.oauth_access_token
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

    public async authEmail(request: Request, response: Response): Promise<any>{
        console.log(request.body)
        const {email,password} : any = request.body
        console.log(email)
        console.log(password)
        if (email != 'test@test' || password != 'test123'){
            return response.status(404).end()
        } 
        const user = new User('Usuario de Teste', 'https://i.imgur.com/JMUdR0i.png', email, 'email')
        const user_id = await this.userService.createUserIfNecessary(user)
        if (!user_id) return response.status(404).end()
        const access_token = this.authenticator.generateToken({...user, id: user_id})
        response.json({ access_token })
    }
    

    public async getUserInfo(request: Request, response: Response): Promise<any>{
        const user_id = response.locals.user_id
        const user = await this.userService.getUser(user_id)
        if (!user) return response.status(404).end()
        return response.json(user).end()
    }

    public async editUserName(request: Request, response: Response): Promise<any>{
        console.log('rota')
        const {name}: any = request.query
        console.log(name)
        if (!name) {
            return response.status(404).json({msg: 'Nome não providenciado.'})
        }
        const is_new_name_valid = this.validator.isNameValid(name.toString())
        if (!is_new_name_valid){
            return response.status(404).json({msg: 'Nome invalido. Min=3, Max=20'})
        }
        const user_id = response.locals.user_id
        const user = await this.userService.getUser(user_id)
        if (!user) return response.status(404).end()
        if (user.name == name){
            return response.status(404).json({msg: 'Nome não foi alterado para mudança.'})
        }
        if (user.email == 'test@test') {
            return response.status(404).json({msg: 'Nome do usuario de teste não pode ser editado'})
        }
        const edited = await this.userService.editUser(user_id, name)
        if (!edited){
            return response.status(404).json({msg: 'Erro inesperado. Tente novamente.'})
        }
        return response.status(200).end()
    }

}

