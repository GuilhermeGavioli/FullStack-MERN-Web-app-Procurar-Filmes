import jwt from 'jsonwebtoken'
import { User } from '../DTOS/user.dto'

export interface Authentication{
    verifyToken(token: string) : string | jwt.JwtPayload
    generateToken(user: any): string
    getUserInfoFromOAuthAccessToken(accessToken: string): Promise<User | null>
}

export class JWTAuthImpl implements Authentication{

    constructor(){}

    public verifyToken(token: string): string | jwt.JwtPayload{
        return jwt.verify(token, process.env.JWT as string)
    }

    public generateToken(user: User): string{
        return jwt.sign({user}, process.env.JWT as string)
    }

    public async getUserInfoFromOAuthAccessToken(accessToken: string): Promise<User | null>{
        const response = await fetch(process.env.GOOGLE_PROFILE_URL as string, {
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        if (response.status !== 200){
            return null
        } else {
            const user: any = await response.json()
            return new User(user.name, user.picture, user.email)
        }
    }
}
