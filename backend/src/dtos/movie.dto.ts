import type { Movie } from '../models/movie.model.ts';

// DTO for query parameters received when filtering movies
export interface GetMoviesFilterDto {
  genre?: string;
  date?: string;
  status?: string;
  search?: string;
}

// Standardized API response DTO for movie lists
export interface MovieListResponseDto {
  success: boolean;
  message: string;
  total: number;
  data: Movie[];
}