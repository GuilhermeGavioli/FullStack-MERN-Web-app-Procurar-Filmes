import { UserRepository } from './user.repository';
import { MovieRepository } from './movie.repository';
import { ObjectId } from 'mongodb';
import {db} from '../index'
import { Rating } from './../DTOS/rating.dto';


export interface RatingRepository {
    insertOneRating(rating: Rating): Promise<ObjectId | undefined>
    getOneRatingById(id: string): Promise<Rating | undefined>
    deleteOneRating(id: string): Promise<boolean | undefined>
}

export class RatingRepositoryImpl implements RatingRepository{



    public async insertOneRating(rating: Rating): Promise<ObjectId | undefined>{
        const query = { user_id: rating.user_id, movie_id: rating.movie_id, comment: rating.comment};
        const data = await db?.db?.collection('Rating').insertOne(query)
        return data?.insertedId
    }

    public async getOneRatingById(id: string): Promise<Rating | undefined>{
        return await db?.db?.collection('Rating').findOne({  _id: new ObjectId(id)}) as Rating | undefined
    }

    public async deleteOneRating(id: string): Promise<boolean | undefined>{
        return (await db?.db?.collection('Rating').deleteOne({  _id: new ObjectId(id)}))?.acknowledged
    }

}

