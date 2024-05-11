import { MovieRepository, MovieRepository, MovieRepositoryImpl } from './Repository/movie.repository';
import swaggerUi from 'swagger-ui-express'
import express, {Request, Response}  from 'express'

// import cors from 'cors'



// import { conn } from './Services/Connection'
// import { User } from './Entities/User'
// setTimeout(async() => {
//     const user = new User('John', 'none', 'me@gmail')
//     console.log(user);
//     const db = conn.getDatabase()
//     await db.collection('User').insertOne(user);
// }, 3000);


const app = express();
// app.use(cors({origin: '*', allowedHeaders: '*'}))
const router = express.Router();

import { Database } from './database';

const db: Database = new Database();
async function Connect(){
    const client = await db.createConnection()
    if (client){
        db.db = client.db(process.env.MONGODB_DB);
    } else {
        Connect()
    }
}


Connect();

export { db };


// ConnectToMongoDB()





import { specs } from './swagger.jsdoc'
// app.get('/googleauth',async (req,res) => {

// })
import { UserControllerImpl, UserController } from './Controllers/UserController'
import { MovieControllerImpl, MovieController } from './Controllers/MovieController'

import { Authentication, JWTAuthImpl } from './Services/authentication.service';
import { Validator, ValidatorImpl } from './Services/validator.service';
import { UserService, UserServiceImpl } from './Services/user.service';


import { UserRepository, UserRepositoryImpl } from './Repository/user.repository';
import { MovieService, MovieServiceImpl } from './Services/movie.service';

const movieRepository: MovieRepository = new MovieRepositoryImpl()
const userRepository: UserRepository = new UserRepositoryImpl()

const validator: Validator = new ValidatorImpl()
const authentication: Authentication = new JWTAuthImpl()
const userService: UserService = new UserServiceImpl(userRepository)
const movieService: MovieService = new MovieServiceImpl(movieRepository) 

const userController: UserController = new UserControllerImpl(userService, authentication, validator)
const movieController: MovieController = new MovieControllerImpl(movieService, authentication, validator)



app.use(router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// routes


router.get('/auth/google/:oauth_access_token', async (request: Request, response: Response) => await userController.authGoogle(request, response))




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