export interface Movie {
  id: number;
  title: string;
  synopsis?: string;
  durationMinutes?: number;
  genre: string;
  rating?: string;
  status: 'cartelera' | 'proximamente' | 'finalizada';
  releaseDate: string;
  posterUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}