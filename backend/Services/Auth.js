const jwt = require('jsonwebtoken')


class Auth{

    static verify(token){
        return jwt.verify(token, process.env.JWT)
    }

    static generateToken(userInfo){
        return jwt.sign(userInfo, process.env.JWT)
    }

    static async getUserInfoFromOAuthAccessToken(accessToken){
        const response = await fetch(process.env.GOOGLE_PROFILE_URL, {
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        const user = await response.json()
        if (!user) {
            return {user: null, googleResponse: {status: await response.status(), message: ''}}
        }
        return {name: user.name, picture: user.picture, email: user.email}
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

module.exports = Auth