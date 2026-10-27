export interface MovieFilterParams {
  genre?: string;
  date?: string;
  status?: string;
  search?: string;
}

export class MovieService {
  public async getFilteredMovies(filters: MovieFilterParams) {
    try {
      console.log('Applying filters in service layer:', filters);

      // Simulated data
      const movies = [
        { id: 1, title: 'Extreme Action', genre: 'Action', status: 'cartelera', releaseDate: '2026-11-01' },
        { id: 2, title: 'City Drama', genre: 'Drama', status: 'proximamente', releaseDate: '2026-11-02' }
      ];

      let filtered = movies;

      // Filter by genre
      if (filters.genre) {
        filtered = filtered.filter(m => m.genre.toLowerCase() === filters.genre?.toLowerCase());
      }
      
      // Filter by status
      if (filters.status) {
        filtered = filtered.filter(m => m.status.toLowerCase() === filters.status?.toLowerCase());
      }

      // Filter by releaseDate
      if (filters.date) {
        filtered = filtered.filter(m => m.releaseDate === filters.date);
      }

      // Filter by title
      if (filters.search) {
        filtered = filtered.filter(m => m.title.toLowerCase().includes(filters.search?.toLowerCase() || ''));
      }

      return filtered;
    } catch (error: any) {
      throw new Error(`Error in movie service: ${error.message}`);
    }
  }
}