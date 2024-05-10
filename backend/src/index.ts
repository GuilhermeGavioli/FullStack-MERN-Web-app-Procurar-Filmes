import express, {Request, Response}  from 'express'


// import cors from 'cors'


import { conn } from './Services/Connection'

import { User } from './Entities/User'
const user = new User('John', 'none', 'me@gmail')
console.log(user);

setTimeout(async() => {
    const db = conn.getDatabase()
    await db.collection('User').insertOne(user);
}, 3000);


const app = express();
// app.use(cors({origin: '*', allowedHeaders: '*'}))





// ConnectToMongoDB()






// app.get('/googleauth',async (req,res) => {

// })
import { userController } from './Controllers/UserController'
import { movieController } from './Controllers/MovieController'


app.get('/auth/google', async (request: Request, response: Response) => await userController.authGoogle(request, response))




// app.get('/access_token/validate', (req,res) => {
//     console.log(req.headers)
//     const access_token = req.headers['authorization']
//     console.log(access_token)
//     const is_valid = Auth.verify(access_token)
//     console.log(is_valid)
//     if (!is_valid)return res.status(400).end()
//     return res.json({ token_info: is_valid })
    
// })


app.listen(3001, () => {
    console.log('Server is Up and Running')
})