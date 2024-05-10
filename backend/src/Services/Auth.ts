import jwt from 'jsonwebtoken'
import { User } from '../Entities/User'

interface Authentication{
    verifyToken(token: string) : string | jwt.JwtPayload
    generateToken(user: any): string
    getUserInfoFromOAuthAccessToken(accessToken: string): Promise<User | null>
}

class JWTAuthImpl implements Authentication{

    constructor(){}

    public verifyToken(token: string): string | jwt.JwtPayload{
        return jwt.verify(token, process.env.JWT as string)
    }

    public generateToken(userInfo: any): string{
        return jwt.sign(userInfo, process.env.JWT as string)
    }

    public async getUserInfoFromOAuthAccessToken(accessToken: string): Promise<User | null>{
        const response = await fetch(process.env.GOOGLE_PROFILE_URL as string, {
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        const user: any = await response.json()
        if (!user) {
            return null;
        }
        return new User(user.name, user.picture, user.email)
    }
}

const authentication: Authentication = new JWTAuthImpl()
export { Authentication, authentication }

//  sub: '101676363529690080238',
//  name: 'Guilherme Gavioli',
//  given_name: 'Guilherme',
//  family_name: 'Gavioli',
//  picture: 'https://lh3.googleusercontent.com/a/ACg8ocJjpHbcYUEKrNJGVwblzq-PjhXLJJ8TqrFpVuIUdaypN8TULvE=s96-c',
//  email: 'xiiguilhermeiix@gmail.com',
//  email_verified: true,
//  locale: 'pt-BR'