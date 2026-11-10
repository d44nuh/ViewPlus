import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import showtimeRoutes from '../src/routes/showtime.routes.ts';

const app = express();
app.use(express.json());
app.use('/api/admin/showtimes', showtimeRoutes);

describe('Showtime Routes Integration Tests', () => {
  it('Debe retornar 400 si se envía un startTime en el pasado', async () => {
    const res = await request(app)
      .post('/api/admin/showtimes')
      .send({
        movieId: 1,
        auditoriumId: 1,
        startTime: '2020-01-01T18:00:00.000Z'
      });
    
    expect(res.status).toBe(400);
  });

  it('Debe retornar error de validación (400) si faltan datos', async () => {
    const res = await request(app)
      .post('/api/admin/showtimes')
      .send({ movieId: 1 });
    
    expect(res.status).toBe(400);
  });
});