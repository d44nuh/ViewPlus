import dotenv from 'dotenv';
import express from 'express';
import { sequelize } from './config/database.ts';
import auditoriumRoutes from './routes/auditorium.routes.ts';
import movieAdminRoutes from './routes/movie.admin.routes.ts';
import showtimeRoutes from './routes/showtime.routes.ts';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/admin/auditoriums', auditoriumRoutes);
app.use('/api/admin/movies', movieAdminRoutes);
app.use('/api/admin/showtimes', showtimeRoutes);

const port = Number(process.env.PORT) || 3000;

await sequelize.sync();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});