import { Request, Response } from 'express';
import { Validator } from '../Services/validator.service';
import { RatingService } from '../Services/rating.service'
import { Rating } from '../DTOS/rating.dto';


export interface RatingController{
    createRating(request: Request, response: Response): Promise<any>;
    deleteRating(request: Request, response: Response): Promise<any>;
    getRatingsBatchByMovieId(request: Request, response: Response): Promise<any>;
    getRatingsBatchFromUserId(request: Request, response: Response): Promise<any>;
}


export class RatingControllerImpl implements RatingController{

    constructor(
        private ratingService: RatingService,
        private validator: Validator
    ){}

    public async createRating(request: Request, response: Response): Promise<any>{
        const { movie_id } = request.params
        const is_movie_id_valid = this.validator.isIdValid(movie_id)
        if (!is_movie_id_valid) return response.status(400).end()
        const {  comment  } = request.body
        const is_comment_valid = this.validator.isCommentValid(comment)
        if (!is_comment_valid) return response.status(400).end()
        const   user_id   = request.res?.locals.user_id
        const rating = new Rating(user_id, movie_id, is_comment_valid)
        const rating_id = await this.ratingService.createRating(rating)
        return response.status(rating_id ? 200 : 404).json(rating_id?.toString())
    }

    public async deleteRating(request: Request, response: Response): Promise<any>{
        const { id } = request.params
        const is_rating_id_valid = this.validator.isIdValid(id)
        if (!is_rating_id_valid) return response.status(400).end()
        const   user_id   = request.res?.locals.user_id
        const was_deleted = await this.ratingService.deleteRating(user_id, id)
        return response.status(was_deleted ? 200 : 404).end()
    }

    public async getRatingsBatchByMovieId(request: Request, response: Response): Promise<any>{
        const { movie_id } = request.params
        const is_movie_id_valid = this.validator.isIdValid(movie_id)
        if (!is_movie_id_valid) return response.status(400).end()
        const { page } = request.query as any
        const is_page_valid = this.validator.isPageValid(page)
        if (!is_page_valid) return response.status(400).end()
        const ratings = await this.ratingService.getRatingsBatchByMovieId(movie_id, is_page_valid)
        return response.json(ratings)
    }

    public async getRatingsBatchFromUserId(request: Request, response: Response): Promise<any>{
        const { page } = request.query as any
        const is_page_valid = this.validator.isPageValid(page)
        if (!is_page_valid) return response.status(400).end()
        const   user_id   = request.res?.locals.user_id
        const ratings = await this.ratingService.getRatingsBatchFromUserId(user_id, is_page_valid)
        return response.json(ratings)
    }
   
}

