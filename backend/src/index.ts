
import swaggerUi from 'swagger-ui-express'
import express from 'express'

// import cors from 'cors'
// app.use(cors({origin: '*', allowedHeaders: '*'}))





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


import {OAuth2Client}  from 'google-auth-library'
import { specs } from './swagger.jsdoc'

const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_SECRET_KEY)



import { AuthGuard } from './auth.guard';
import { MovieRepository, MovieRepositoryImpl } from './Repository/movie.repository';
import { UserRepository, UserRepositoryImpl } from './Repository/user.repository';
import { UserService, UserServiceImpl } from './Services/user.service';
import { MovieService, MovieServiceImpl } from './Services/movie.service';
import { Authentication, JWTAuthImpl } from './Services/authentication.service';
import { Validator, ValidatorImpl } from './Services/validator.service';
import { UserControllerImpl, UserController } from './Controllers/UserController'
import { MovieControllerImpl, MovieController } from './Controllers/MovieController'

const movieRepository: MovieRepository = new MovieRepositoryImpl()
const userRepository: UserRepository = new UserRepositoryImpl()
const userService: UserService = new UserServiceImpl(userRepository)
const movieService: MovieService = new MovieServiceImpl(movieRepository)
const validator: Validator = new ValidatorImpl()
const authentication: Authentication = new JWTAuthImpl()
const userController: UserController = new UserControllerImpl(userService, authentication, validator)
const movieController: MovieController = new MovieControllerImpl(movieService, validator)

const app = express()
const router = express.Router()

app.use(router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
router.get('/auth/google/:oauth_access_token', (rq:any,rs:any) => userController.authGoogle(rq,rs))
router.get('/movie/:id', AuthGuard.verifyToken,(rq:any,rs:any) => movieController.getMovieById(rq,rs))
router.get('/movies/:page/:genre', AuthGuard.verifyToken,(rq:any,rs:any) => movieController.getMoviesBatchByGenre(rq,rs))




app.listen(3001, () => {
    console.log('Server is Up and Running')
})