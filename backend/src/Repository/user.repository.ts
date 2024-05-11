import { User } from "../DTOS/user.dto";
import {db} from '../index'


export interface UserRepository {
    insertUser(user: User): Promise<void>
    findOne(email: string): Promise<User | null>
}

export class UserRepositoryImpl implements UserRepository{

    public async insertUser(user: User): Promise<void>{
        console.log(user)
        console.log('db')
        console.log(db)
        await db?.db?.collection('User').insertOne({name: user.name, email: user.email, picture: user.picture})
    }

    public async findOne(email: string): Promise<User | null>{
        const user = await db?.db?.collection('User').findOne({email}) as User | null
        console.log('found')
        console.log(user)
        return user;
    }
}

