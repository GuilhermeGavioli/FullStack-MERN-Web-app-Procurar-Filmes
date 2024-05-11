import { Request, Response } from 'express';
import { Authentication } from '../Services/authentication.service';
import { Validator } from '../Services/validator.service';
import { MovieService } from '../Services/movie.service'


export interface MovieController{
    getMoviesBatchByGenre(request: Request, response: Response): Promise<any>;
    getMovieById(request: Request, response: Response): Promise<any>;
}


export class MovieControllerImpl implements MovieController{

    constructor(
        private movieService: MovieService,
        private authentication: Authentication,
        private validator: Validator
    ){}

    public async getMoviesBatchByGenre(request: Request, response: Response): Promise<any>{
        const { page, genre } = request.params
        const movies = await this.movieService.getMoviesBatchByGenre(genre, Number(page))
        console.log(movies)
        response.json(movies)
    }

    public async getMovieById(request: Request, response: Response): Promise<any>{
        const { id } = request.params
        const movie = await this.movieService.getMovieById(id)
        console.log(movie)
        response.json(movie)
    }

}

