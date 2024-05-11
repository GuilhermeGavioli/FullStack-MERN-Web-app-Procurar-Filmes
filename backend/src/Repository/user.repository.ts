import { ObjectId } from "mongodb";
import { User } from "../DTOS/user.dto";
import {db} from '../main'


export interface UserRepository {
    insertUser(user: User): Promise<void>
    findOneByEmail(email: string): Promise<User | undefined>
    findUserById(id: string): Promise<User | undefined>
}

export class UserRepositoryImpl implements UserRepository{

    public async insertUser(user: User): Promise<void>{
        await db?.db?.collection('User').insertOne({name: user.name, email: user.email, picture: user.picture})
    }

    public async findOneByEmail(email: string): Promise<User | undefined>{
        const user = await db?.db?.collection('User').findOne({email}) as User | undefined
        return user;
    }

    public async findUserById(id: string): Promise<User | undefined>{
        return await db?.db?.collection('Movie').findOne({  _id: new ObjectId(id)}) as User | undefined
    }
}

