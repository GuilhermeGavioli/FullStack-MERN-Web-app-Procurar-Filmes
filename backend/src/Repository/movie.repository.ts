import { MongoClient }  from 'mongodb'
import { User } from "../DTOS/user.dto";
import {db} from '../index'
import { Db }  from 'mongodb'
import { Movie } from '../DTOS/movie.dto';


export interface MovieRepository {
    getOneMovieById(id: string): Promise<Movie | null>
}

export class MovieRepositoryImpl implements MovieRepository{

    public async getOneMovieById(id: string): Promise<Movie | null>{
        return null
    }
}

