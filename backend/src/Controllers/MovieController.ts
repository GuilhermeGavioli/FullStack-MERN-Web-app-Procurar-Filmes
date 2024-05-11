import { Request, Response } from 'express';
import { Authentication } from '../Services/authentication.service';
import { Validator } from '../Services/validator.service';
import { MovieService } from '../Services/movie.service';


export interface MovieController{
    getOneMovieById(request: Request, response: Response): any;
}


export class MovieControllerImpl implements MovieController{

    constructor(
        private movieService: MovieService,
        private authentication: Authentication,
        private validator: Validator
    ){}

    public getOneMovieById(request: Request, response: Response): any{
        response.json({movie: 'blocked movie'})
        
    }

}

