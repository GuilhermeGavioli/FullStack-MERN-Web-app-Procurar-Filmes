
import swaggerUi from 'swagger-ui-express'
import express, {NextFunction, Request, Response}  from 'express'

// import cors from 'cors'



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






import { specs } from './swagger.jsdoc'

import { UserControllerImpl, UserController } from './Controllers/UserController'
import { MovieControllerImpl, MovieController } from './Controllers/MovieController'

import { Authentication, JWTAuthImpl } from './Services/authentication.service';
import { Validator, ValidatorImpl } from './Services/validator.service';
import { UserService, UserServiceImpl } from './Services/user.service';
import { MovieService, MovieServiceImpl } from './Services/movie.service';

import { MovieRepository, MovieRepositoryImpl } from './Repository/movie.repository';
import { UserRepository, UserRepositoryImpl } from './Repository/user.repository';


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


import { AuthGuard } from './auth.guard';

router.get('/auth/google/:oauth_access_token', userController.authGoogle)
router.get('/movie/:id', AuthGuard.verifyToken, movieController.getOneMovieById)


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