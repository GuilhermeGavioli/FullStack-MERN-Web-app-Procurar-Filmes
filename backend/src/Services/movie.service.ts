
import { Movie } from '../DTOS/movie.dto';
import { MovieRepository } from '../Repository/movie.repository';

export interface MovieService{
    getMovieById(id: string): Promise<Movie | null>
}

export class MovieServiceImpl {
  constructor(
    private readonly movieRepository: MovieRepository,
  ) {}

  async getMovieById(id: string): Promise<Movie | null> {
    return null;
  }
}