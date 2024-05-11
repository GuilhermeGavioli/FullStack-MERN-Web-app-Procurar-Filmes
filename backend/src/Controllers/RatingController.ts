import { Request, Response } from 'express';
import { Validator } from '../Services/validator.service';
import { RatingService } from '../Services/rating.service'
import { Rating } from '../DTOS/rating.dto';


export interface RatingController{
    createRating(request: Request, response: Response): Promise<any>;
    deleteRating(request: Request, response: Response): Promise<any>;
    getRatingsBatchByMovieId(request: Request, response: Response): Promise<any>;
}


export class RatingControllerImpl implements RatingController{

    constructor(
        private ratingService: RatingService,
        private validator: Validator
    ){}

    public async createRating(request: Request, response: Response): Promise<any>{
        const { movie_id } = request.params
        const {  comment  } = request.body
        const {  user_id  } = request.res?.locals.id
        const rating = new Rating(user_id, movie_id, comment)
        const rating_id = await this.ratingService.createRating(rating)
        return response.status(rating_id ? 200 : 404).json(rating_id?.toString())
    }

    public async deleteRating(request: Request, response: Response): Promise<any>{
        const { id } = request.params
        const { user_id } = request.res?.locals.id
        const was_deleted = await this.ratingService.deleteRating(user_id, id)
        return response.status(was_deleted ? 200 : 404).end()
    }

    public async getRatingsBatchByMovieId(request: Request, response: Response): Promise<any>{
        const { page, movie_id } = request.params
        const ratings = await this.ratingService.getRatingsBatchByMovieId(movie_id, Number(page))
        return response.json(ratings)
    }

   

}

