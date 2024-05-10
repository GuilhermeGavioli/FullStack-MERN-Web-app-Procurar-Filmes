import { Request, Response } from 'express';


interface MovieController{
    getMovie(request: Request, response: Response): any;
}


class MovieControllerImpl implements MovieController{


    public getMovie(request: Request, response: Response): any{
        response.send('ok')
    }

}

const movieController: MovieControllerImpl = new MovieControllerImpl()
export { movieController }