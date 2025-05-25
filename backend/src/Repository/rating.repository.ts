import { UserRepository } from './user.repository';
import { MovieRepository } from './movie.repository';
import { ObjectId } from 'mongodb';
import {db} from '../main'
import { Rating } from './../DTOS/rating.dto';


export interface RatingRepository {
    insertOneRating(rating: Rating): Promise<ObjectId | undefined>
    getOneRatingById(id: string): Promise<Rating | undefined>
    deleteOneRating(id: string): Promise<boolean | undefined>
    updateOneRating(id: string, rating: Rating): Promise<boolean | undefined>
    getRatingsBatchByMovieId(id: string, page: number): Promise<Rating[] | []>
    getRatingsBatchFromUserId(id: string, page: number): Promise<Rating[] | []>
}

export class RatingRepositoryImpl implements RatingRepository{

    public async insertOneRating(rating: Rating): Promise<ObjectId | undefined>{
        const query = { user_id: new ObjectId(rating.user_id), movie_id: new ObjectId(rating.movie_id), comment: rating.comment, stars: rating.stars};
        console.log(query)
        const data = await db?.db?.collection('Rating').insertOne(query)
        return data?.insertedId
    }

    public async updateOneRating(id: string, rating: Rating): Promise<boolean | undefined>{
      const filter = {_id: new ObjectId(id)}
        const query = {$set: { user_id: new ObjectId(rating.user_id), movie_id: new ObjectId(rating.movie_id), comment: rating.comment, stars: rating.stars}};
        return (await db?.db?.collection('Rating').updateOne(filter, query))?.acknowledged
    }

    public async getOneRatingById(id: string): Promise<Rating | undefined>{
        return await db?.db?.collection('Rating').findOne({  _id: new ObjectId(id)}) as Rating | undefined
    }

    public async deleteOneRating(id: string): Promise<boolean | undefined>{
        return (await db?.db?.collection('Rating').deleteOne({  _id: new ObjectId(id)}))?.acknowledged
    }

    public async getRatingsBatchByMovieId(id: string, page: number): Promise<Rating[] | []>{
        const PAGE_SIZE = 20
        const skip = (page - 1) * PAGE_SIZE

        const pipeline = [
            
          {
              $lookup: {
                from: "User", // Foreign collection name (Users)
                localField: "user_id", // Field in ratings referencing user
                foreignField: "_id", // Field in users with user ID (assuming _id)
                as: "user", // Name for the joined user data
              },
            },
            {
              $unwind: "$user", // Deconstructs the "user" array (if it contains multiple entries)
            },
            {
              $project: {
                // Include desired fields from ratings and user (exclude unnecessary ones)
                _id: 1,
                movie_id: 1,
                comment: 1, // Replace with specific fields you want from ratings
                stars: 1,
                user: {_id: 1, name: 1, picture: 1 }, // Include username and picture from user
              },
            },
            {
              $match: {
                movie_id: new ObjectId(id), // Filter by movie_id
              },
            },
            {
              $sort: {
                // Specify the field to sort by and its order (1 for ascending, -1 for descending)
                _id: -1 
              },
            },
          ];
          
          const cursor = await db?.db?.collection('Rating').aggregate(pipeline).skip(skip).limit(PAGE_SIZE).toArray();
        return cursor as Rating[] | [];
    }

    public async getRatingsBatchFromUserId(id: string, page: number): Promise<Rating[] | []>{
        const PAGE_SIZE = 10
        const skip = (page - 1) * PAGE_SIZE
        // _id: new ObjectId(id),
        console.log(id)
        console.log(page)
        const pipeline = [
            {
              $match: { // Filter based on _id
                user_id: new ObjectId(id) // Replace with the actual ObjectId you want to query for
              },
            },
            {
              $sort: {
                _id: -1 
              },
            }
          ]
          const cursor = await db?.db?.collection('Rating').aggregate(pipeline).skip(skip).limit(PAGE_SIZE).toArray();
          console.log('cursor')
          console.log(cursor)

          
        // const data = await db?.db?.collection('Rating').find(query).skip(skip).limit(PAGE_SIZE).toArray()
        return cursor as Rating[] | [];
    }

}

