import { ObjectId } from "mongodb";
import { MongoUser, User } from "../DTOS/user.dto";
import {db} from '../main'


export interface UserRepository {
    insertUser(user: User): Promise<ObjectId | undefined>
    findOneByEmail(email: string): Promise<MongoUser | undefined>
    findUserById(id: string): Promise<User | undefined>
    editUserNameById(id: string, new_name: string): Promise<Boolean>
}

export class UserRepositoryImpl implements UserRepository{

    public async insertUser(user: User): Promise<ObjectId | undefined>{
        const insertion = await db?.db?.collection('User').insertOne({name: user.name, email: user.email, picture: user.picture})
        return insertion?.insertedId
    }

    public async findOneByEmail(email: string): Promise<MongoUser | undefined>{
        const user = await db?.db?.collection('User').findOne({email}) as MongoUser | undefined
        return user as MongoUser | undefined;
        // return { ...user, _id: user?._id.toString()} as MongoUser | undefined
    }

    public async findUserById(id: string): Promise<User | undefined>{
        return await db?.db?.collection('User').findOne({  _id: new ObjectId(id)}) as User | undefined
    }

    public async editUserNameById(id: string, new_name: string): Promise<Boolean>{
        const result = await db?.db?.collection('User').updateOne({  _id: new ObjectId(id)}, {$set: {name: new_name}})
        if (result?.modifiedCount == 1) return true
        return false
    }

}

