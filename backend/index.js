require('dotenv/config')
const express = require('express')
// const fetch = require('node-fetch');
const mongodb = require('mongodb')
const {OAuth2Client} = require('google-auth-library')

const app = express()


const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_SECRET_KEY)

app.get('/googleauth',async (req,res) => {
    const access_token = req.headers['Authorization']
    const user = getUserInfoFromOAuthAccessToken(access_token)
    if (!user){
        res.statusCode = 400
        res.end()
    }
    
    user.name
})



async function getUserInfoFromOAuthAccessToken(accessToken){
    try{

    const response = await fetch(process.env.GOOGLE_PROFILE_URL, {
        headers: {'Authorization': `Bearer ${accessToken}`}
    })
    const user = await response.json()
    return user;
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
    } catch(err) {
    console.error('Error fetching data:', err);
  }
}

(async()=>{
    await getUserInfoFromOAuthAccessToken()
})()


app.listen(3001, () => {
    console.log('Server is Up and Running')
})