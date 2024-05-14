import { Request, Response } from 'express';
import { Validator } from '../Services/validator.service';
import { MovieService } from '../Services/movie.service'


export interface MovieController{
    getMoviesBatchByGenre(request: Request, response: Response): Promise<any>;
    getMovieById(request: Request, response: Response): Promise<any>;
}


export class MovieControllerImpl implements MovieController{

    constructor(
        private movieService: MovieService,
        private validator: Validator
    ){}

    public async getMoviesBatchByGenre(request: Request, response: Response): Promise<any>{
        console.log(request.params)
        const { page } = request.params
        const { genre } = request.query
        if (!genre) return
        const movies = await this.movieService.getMoviesBatchByGenre(genre.toString(), Number(page))
        response.json(movies)
    }

    public async getMovieById(request: Request, response: Response): Promise<any>{
        const { id } = request.params
        const movie = await this.movieService.getMovieById(id)
        console.log(movie)
        response.json(movie)
    }

}

