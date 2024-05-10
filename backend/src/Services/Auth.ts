import jwt from 'jsonwebtoken'

interface Authenthication{
    verifyToken(token: string) : string | jwt.JwtPayload
    generateToken(user: any): string
    getUserInfoFromOAuthAccessToken(accessToken: string): Promise<string>
}

class JWTAuthImpl implements Authenthication{

    public verifyToken(token: string): string | jwt.JwtPayload{
        return jwt.verify(token, process.env.JWT as string)
    }

    public generateToken(userInfo: any): string{
        return jwt.sign(userInfo, process.env.JWT as string)
    }

    public async getUserInfoFromOAuthAccessToken(accessToken: string): Promise<string>{
        const response = await fetch(process.env.GOOGLE_PROFILE_URL as string, {
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        const user = await response.json()
        if (!user) {
            return 'null'
        }
        // return {name: user.name, picture: user.picture, email: user.email}
        return 'ok'
        // {
        //     sub: '101676363529690080238',
        //     name: 'Guilherme Gavioli',
        //     given_name: 'Guilherme',
        //     family_name: 'Gavioli',
        //     picture: 'https://lh3.googleusercontent.com/a/ACg8ocJjpHbcYUEKrNJGVwblzq-PjhXLJJ8TqrFpVuIUdaypN8TULvE=s96-c',
        //     email: 'xiiguilhermeiix@gmail.com',
        //     email_verified: true,
        //     locale: 'pt-BR'
        //   }

    }
}

export {Authenthication, JWTAuthImpl}