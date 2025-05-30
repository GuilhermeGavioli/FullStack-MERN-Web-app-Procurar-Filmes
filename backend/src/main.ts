import {OAuth2Client}  from 'google-auth-library'
// const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_SECRET_KEY)
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser';
import { Database } from './database';
// import { router as movieRouter } from './Routes/movie.route';
// import { router as userRouter } from './Routes/user.route';
// import { router as ratingRouter } from './Routes/rating.route';

// import { authGuard } from './objects.instances';
// import { movieController } from "./objects.instances";
// import { userController } from "./objects.instances";
// import { ratingController } from "./objects.instances";






//*****************************PROD***********************************//
import https from 'https';
import fs from 'fs';
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/procurarfilmes.xyz/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/procurarfilmes.xyz/fullchain.pem')
};
// -----------------------------------

import { MovieRepository, MovieRepositoryImpl } from './Repository/movie.repository';
import { UserRepository, UserRepositoryImpl } from './Repository/user.repository';
import { UserService, UserServiceImpl } from './Services/user.service';
import { MovieService, MovieServiceImpl } from './Services/movie.service';
import { Authentication, JWTAuthImpl } from './Services/authentication.service';
import { Validator, ValidatorImpl } from './Services/validator.service';
import { UserControllerImpl, UserController } from './Controllers/UserController'
import { MovieControllerImpl, MovieController } from './Controllers/MovieController'
import { RatingControllerImpl, RatingController } from './Controllers/RatingController'
import { RatingRepository, RatingRepositoryImpl } from './Repository/rating.repository';
import { RatingService, RatingServiceImpl } from './Services/rating.service';
import { AuthGuard, AuthGuardImpl } from './Middlewares/authguard.middleware';
const movieRepository: MovieRepository = new MovieRepositoryImpl()
const userRepository: UserRepository = new UserRepositoryImpl()
const ratingRepository: RatingRepository = new RatingRepositoryImpl()
const userService: UserService = new UserServiceImpl(userRepository)
const movieService: MovieService = new MovieServiceImpl(movieRepository)
const ratingService: RatingService = new RatingServiceImpl(ratingRepository, userRepository, movieRepository)
const validator: Validator = new ValidatorImpl()
const authenticator: Authentication = new JWTAuthImpl()

export const authGuard: AuthGuard = new AuthGuardImpl(authenticator)
export const userController: UserController = new UserControllerImpl(userService, authenticator, validator)
export const movieController: MovieController = new MovieControllerImpl(movieService, validator)
export const ratingController: RatingController = new RatingControllerImpl(ratingService, validator)


// ----------------------------------







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


export const router = express.Router()
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({origin: process.env.ALLOWED_ORIGIN, credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
}))

// app.use(movieRouter)
app.get('/movie/:id', (rq,rs,nx) => authGuard.protect(rq,rs,nx) , (rq:any,rs:any) => movieController.getMovieById(rq,rs))
app.get('/movies/:page/genres', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => movieController.getMoviesBatchByGenre(rq,rs))
app.get('/movies/sample/random', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => movieController.getTenRandomMovies(rq,rs))
app.get('/movies/sample/olddies', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => movieController.getTenOldMovies(rq,rs))
app.get('/movies/results/:page', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => movieController.getMoviesByText(rq,rs))
// app.use(userapp)
app.get('/auth/google/:oauth_access_token', (rq:any,rs:any) => userController.authGoogle(rq,rs))
app.post('/auth/email', (rq:any,rs:any) => userController.authEmail(rq,rs))
app.get('/auth/user/getinfo', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => userController.getUserInfo(rq,rs))
app.get('/user/edit', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => userController.editUserName(rq,rs))
// app.use(ratingapp)
app.post('/ratings/create/for_movie/:movie_id', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => ratingController.createRating(rq,rs))
app.get('/ratings/:movie_id', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => ratingController.getRatingsBatchByMovieId(rq,rs))
app.delete('/ratings/delete/:id', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => ratingController.deleteRating(rq,rs))
app.put('/ratings/update/:id', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => ratingController.updateRating(rq,rs))
app.get('/myratings', (rq,rs,nx) => authGuard.protect(rq,rs,nx), (rq:any,rs:any) => ratingController.getRatingsBatchFromUserId(rq,rs))

app.get('/health', (req,res)=> {
    res.send('ok')
})

// app.listen(process.env.PORT, () => {
//   console.log('Server is Up and Running on 80');
// });
//*****************************PROD***********************************//
https.createServer(options, app).listen(process.env.PORT, () => {
  console.log('UpOn443');
});