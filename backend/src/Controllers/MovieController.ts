import { Request, Response } from 'express';
import { Authentication } from '../Services/authentication.service';
import { Validator } from '../Services/validator.service';


export interface MovieController{
    getMovie(request: Request, response: Response): any;
}


export class MovieControllerImpl implements MovieController{

    constructor(
        private movieService: MovieService,
        private authentication: Authentication,
        private validator: Validator
    ){}

    public getMovie(request: Request, response: Response): any{
        response.json({movie: 'blocked movie'})
        
    }

}

