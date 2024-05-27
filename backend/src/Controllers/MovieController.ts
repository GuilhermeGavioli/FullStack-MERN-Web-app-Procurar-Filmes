import { Request, Response } from 'express';
import { Validator, Valids } from '../Services/validator.service';
import { MovieService } from '../Services/movie.service'


export interface MovieController{
    getMoviesBatchByGenre(request: Request, response: Response): Promise<any>;
    getMovieById(request: Request, response: Response): Promise<any>;
    getTenRandomMovies(request: Request, response: Response): Promise<any>
    getMoviesByText(request:Request, response: Response): Promise<any>;
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

    public async getTenRandomMovies(request: Request, response: Response): Promise<any>{
        const movies = await this.movieService.getTenRandomMovies()
        response.json(movies)
    }

    public async getMoviesByText(request:Request, response: Response): Promise<any>{
        console.log('moviesbytext')
        const { page } = request.params as any
        const { query, year, runtime, min_runtime, max_runtime, min_year, max_year } = request.query as any

        const valids: Valids = {}

        if (year === '1'){
            const sanitazed_min_year = this.validator.isYearValid(min_year)
            const sanitazed_max_year = this.validator.isYearValid(max_year)
            if (sanitazed_min_year && sanitazed_max_year){
                const are_years_valid = this.validator.areYearsValid(sanitazed_min_year, sanitazed_max_year)
                if (are_years_valid){
                    valids.year = {min: sanitazed_min_year, max: sanitazed_max_year}
                } else {
                    // error
                    return response.status(400).end()
                }
            } else {
                // error
                return response.status(400).end()
            }
        }

        if (runtime === '1'){
            const sanitazed_min_runtime = this.validator.isRuntimeValid(min_runtime)
            const sanitazed_max_runtime = this.validator.isRuntimeValid(max_runtime)
            if (sanitazed_min_runtime && sanitazed_max_runtime){
                const are_runtimes_valid = this.validator.areRuntimesValid(sanitazed_min_runtime, sanitazed_max_runtime)
                if (are_runtimes_valid){
                    valids.runtime = {min: sanitazed_min_runtime, max: sanitazed_max_runtime}
                } else {
                    // error
                }
            } else {
                // error
            }
        }

        const movies= await this.movieService.getMoviesByText(query, Number(page), valids)
        console.log(movies)
        response.json(movies)
    }


    // movies/results/:page?query=a&min_runtime=50&max_runtime=100&min_year=1930&max_year=2010

}

