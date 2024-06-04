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
        const { page } = request.params
        const is_page_valid = this.validator.isPageValid(page)
        if (!is_page_valid) return response.status(400).end()
        const { genre } = request.query

        if (!genre) return
        const movies = await this.movieService.getMoviesBatchByGenre(genre.toString(), is_page_valid)
        response.json(movies)
    }

    public async getMovieById(request: Request, response: Response): Promise<any>{
        const { id } = request.params
        const is_id_valid = this.validator.isIdValid(id)
        if (!is_id_valid) return response.status(400).end()
        const movie = await this.movieService.getMovieById(id)
        response.json(movie)
    }

    public async getTenRandomMovies(request: Request, response: Response): Promise<any>{
        const movies = await this.movieService.getTenRandomMovies()
        response.json(movies)
    }

    public async getMoviesByText(request:Request, response: Response): Promise<any>{
        const { page } = request.params as any
        const is_page_valid = this.validator.isPageValid(page)
        if (!is_page_valid) return response.status(400).end()
        const { query, year, runtime, min_runtime, max_runtime, min_year, max_year } = request.query as any
        const is_query_valid = this.validator.isQueryValid(query)
        if (!is_query_valid) return response.status(400).end()

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

        const movies= await this.movieService.getMoviesByText(is_query_valid, is_page_valid, valids)
        response.json(movies)
    }
}

