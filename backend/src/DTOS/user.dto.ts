import { ObjectId } from "mongodb";

export class User{
    constructor(
        readonly name: string,
        readonly picture: string,
        readonly email: string,
    ){}
}

export interface MongoUser {
    _id: ObjectId,
    name: string,
    picture: string,
    email: string,
}



