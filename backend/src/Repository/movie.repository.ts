import { ObjectId } from 'mongodb';
import {db} from '../main'
import { Movie } from '../DTOS/movie.dto';
import { Valids } from '../Services/validator.service';


export interface MovieRepository {
    getMoviesBatchByGenre(genre: string, page: number): Promise<Movie[] | []>
    getMovieById(id: string): Promise<Movie | undefined>
    getTenRandomMovies(): Promise<Movie[] | undefined>
    getMoviesByTextAndFilters(
        query: string,
        page: number,
        valids: Valids
    ): Promise<Movie[] | []>
}

export class MovieRepositoryImpl implements MovieRepository{

    public async getMoviesBatchByGenre(genre: string, page: number): Promise<Movie[] | []>{
        const PAGE_SIZE = 20
        const skip = (page - 1) * PAGE_SIZE
        const query = { genres: { $in: [genre] } };
        const data = await db?.db?.collection('Movie').find(query).skip(skip).limit(PAGE_SIZE).toArray()
        return data as Movie[] | [];
    }

    public async getMovieById(id: string): Promise<Movie | undefined>{
        // transform in singleton,
        return await db?.db?.collection('Movie').findOne({  _id: new ObjectId(id)}) as Movie | undefined
    }
    
    public async getTenRandomMovies(): Promise<Movie[] | undefined>{
        const pipeline = [ { $sample: { size: 10 } } ];
        return await db?.db?.collection('Movie').aggregate(pipeline).toArray() as Movie[] | undefined
    }

    public async getMoviesByTextAndFilters(
        query: string,
        page: number,
        valids: Valids
    ): Promise<Movie[] | []>{
     
        const PAGE_SIZE = 20
        const skip = (page - 1) * PAGE_SIZE

        const regex = new RegExp(query, "i"); // 'i' flag for case-insensitive

        const filters: any = [
            { title: { $regex: regex } }
        ]

        // if (valids?.year){
        //     filters.push( { year: { $gt: valids.runtime.min, $lt: valids.runtime.max } } )
        // }

        if (valids?.runtime){
            filters.push( { runTime: { $gt: valids.runtime.min, $lt: valids.runtime.max } } )
        }

        const filter = { 
            $and: filters
        }

        console.log(filters)        

        const data = await db?.db?.collection('Movie').find(filter).skip(skip).limit(PAGE_SIZE).toArray() as Movie[] | []
        console.log(data)
        return data
    }
}

