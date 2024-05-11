interface Director{
    name: string,
    picture: string,
}

interface Actor{
    name: string,
    picture: string,
}

export class Movie{
    constructor(
        readonly title: string,
        readonly cover: string,
        readonly genres: string[],
        readonly description: string,
        readonly runTime: number,
        readonly released: string,
        readonly director: Director[],
        readonly actors: Actor[],
        
    ){}
}

