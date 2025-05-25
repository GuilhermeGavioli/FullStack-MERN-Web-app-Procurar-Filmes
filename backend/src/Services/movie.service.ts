
import { Movie } from '../DTOS/movie.dto';
import { MovieRepository } from '../Repository/movie.repository';
import { Valids } from './validator.service';

export interface MovieService{
    getMoviesBatchByGenre(genre: string, page: number): Promise<Movie[] | []>
    getMovieById(id: string): Promise<Movie | undefined>
    getTenRandomMovies(): Promise<Movie[] | []>
    getTenOldMovies(): Promise<Movie[] | []>
    getMoviesByText(query: string, page: number, valids: Valids): Promise<Movie[] | []>
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

  async getTenRandomMovies(): Promise<Movie[] | []>{
    return await this.movieRepository.getTenRandomMovies() as Movie[] | []
  }

  async getTenOldMovies(): Promise<Movie[] | []>{
    return await this.movieRepository.getTenOldMovies() as Movie[] | []
  }

  async getMoviesByText(query: string, page: number, valids: Valids): Promise<Movie[] | []>{
    return await this.movieRepository.getMoviesByTextAndFilters(query, page, valids)
  }
}