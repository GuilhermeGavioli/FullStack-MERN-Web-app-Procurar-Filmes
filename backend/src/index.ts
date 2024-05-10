import express  from 'express'
import mongodb  from 'mongodb'
import {OAuth2Client}  from 'google-auth-library'
import cors from 'cors'

import Auth  from './Services/Auth'
import Validator  from './Services/Validator'

const app = express();
app.use(cors({origin: '*', allowedHeaders: '*'}))



const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_SECRET_KEY)

app.get('/googleauth',async (req,res) => {
    const oauth_access_token = req.query.oauth_access_token
    //Validator.validate()
    const user = await Auth.getUserInfoFromOAuthAccessToken(oauth_access_token)
    if (!user){
        return res.status(400); res.end()
    }
    const access_token = Auth.generateToken(user)
    return res.json({ access_token })
})



app.get('/access_token/validate', (req,res) => {
    console.log(req.headers)
    const access_token = req.headers['authorization']
    console.log(access_token)
    const is_valid = Auth.verify(access_token)
    console.log(is_valid)
    if (!is_valid)return res.status(400).end()
    return res.json({ token_info: is_valid })
    
})


app.listen(3001, () => {
    console.log('Server is Up and Running')
})