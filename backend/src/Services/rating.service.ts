
import { ObjectId } from 'mongodb';
import { Rating } from '../DTOS/rating.dto';
import { MovieRepository } from '../Repository/movie.repository';
import { RatingRepository } from '../Repository/rating.repository';
import { UserRepository } from '../Repository/user.repository';

export interface RatingService{
    createRating(rating: Rating): Promise<ObjectId | undefined>
    deleteRating(id: string, rating_id: string): Promise<boolean>
    getRatingsBatchByMovieId(id: string, page: number): Promise<Rating[] | []>
    getRatingsBatchFromUserId(id: string, page: number): Promise<Rating[] | []>
}

export class RatingServiceImpl {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private userRepository: UserRepository,
    private movieRepository: MovieRepository,
  ) {}

  async createRating(rating: Rating): Promise<ObjectId | undefined> {
    const movie = await this.movieRepository.getMovieById(rating.movie_id)
    if (!movie) return
    const user = await this.userRepository.findUserById(rating.user_id)
    if (!user) return
    return await this.ratingRepository.insertOneRating(rating)
  }

  async deleteRating(user_id: string, rating_id: string): Promise<boolean>{
    const found_rating = await this.ratingRepository.getOneRatingById(rating_id)
    if (!found_rating) return false // Does not exist
    if (found_rating.user_id.toString() !== user_id) return false // Does not belong to the user
    const was_deleted = await this.ratingRepository.deleteOneRating(rating_id)
    if (!was_deleted) return false
    return true
  }

  async getRatingsBatchByMovieId(id: string, page: number): Promise<Rating[] | []>{
    return await this.ratingRepository.getRatingsBatchByMovieId(id, page)
  }

  async getRatingsBatchFromUserId(id: string, page: number): Promise<Rating[] | []>{
    return await this.ratingRepository.getRatingsBatchFromUserId(id, page)
  }

  
  // check if movie exists
}