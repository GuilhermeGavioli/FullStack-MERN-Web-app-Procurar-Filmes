export class Rating{
    constructor(
        readonly user_id: string,
        readonly movie_id: string,
        readonly comment: string,
        readonly stars: Number,
    ){}
}

