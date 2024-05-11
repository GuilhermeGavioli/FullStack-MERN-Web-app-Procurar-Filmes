
import { Movie } from '../DTOS/movie.dto';
import { MovieRepository } from '../Repository/movie.repository';

export interface MovieService{
    getMoviesBatchByGenre(genre: string, page: number): Promise<Movie[] | []>
    getMovieById(id: string): Promise<Movie | undefined>
}

export class MovieServiceImpl {
  constructor(
    private readonly movieRepository: MovieRepository,
  ) {}

  async getMovieById(id: string): Promise<Movie | undefined> {
    return await this.movieRepository.getMovieById(id)
  }

  async getMoviesBatchByGenre(genre: string, page: number): Promise<Movie[] | []>{
    return await this.movieRepository.getMoviesBatchByGenre(genre, page)
  }
}