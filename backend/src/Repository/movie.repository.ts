import { ObjectId } from 'mongodb';
import {db} from '../main'
import { Movie } from '../DTOS/movie.dto';


export interface MovieRepository {
    getMoviesBatchByGenre(genre: string, page: number): Promise<Movie[] | []>
    getMovieById(id: string): Promise<Movie | undefined>
}

export class MovieRepositoryImpl implements MovieRepository{

    public async getMoviesBatchByGenre(genre: string, page: number): Promise<Movie[] | []>{
        const PAGE_SIZE = 10
        const skip = (page - 1) * PAGE_SIZE
        const query = { genres: { $in: [genre] } };
        const data = await db?.db?.collection('Movie').find(query).skip(skip).limit(PAGE_SIZE).toArray()
        return data as Movie[] | [];
    }

    public async getMovieById(id: string): Promise<Movie | undefined>{
        // transform in singleton,
        return await db?.db?.collection('Movie').findOne({  _id: new ObjectId(id)}) as Movie | undefined
    }

}

