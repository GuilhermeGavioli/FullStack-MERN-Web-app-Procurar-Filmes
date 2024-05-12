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

const movieRepository: MovieRepository = new MovieRepositoryImpl()
const userRepository: UserRepository = new UserRepositoryImpl()
const ratingRepository: RatingRepository = new RatingRepositoryImpl()
const userService: UserService = new UserServiceImpl(userRepository)
const movieService: MovieService = new MovieServiceImpl(movieRepository)
const ratingService: RatingService = new RatingServiceImpl(ratingRepository, userRepository, movieRepository)
const validator: Validator = new ValidatorImpl()
const authentication: Authentication = new JWTAuthImpl()

export const userController: UserController = new UserControllerImpl(userService, authentication, validator)
export const movieController: MovieController = new MovieControllerImpl(movieService, validator)
export const ratingController: RatingController = new RatingControllerImpl(ratingService, validator)