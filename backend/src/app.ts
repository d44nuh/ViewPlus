import express from 'express';
import { createDatabaseIfNotExists } from './config/initDb.ts';
import sequelize from './config/database.ts';
import healthRoutes from './routes/health.routes.ts';
import userRoutes from './routes/users.routes.ts';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function startServer() {
  try {
    await createDatabaseIfNotExists();
    //conecta sequelize
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');

    //levanta el server
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}
app.use('/api', healthRoutes);
app.use('/api', userRoutes);

startServer();

export default app;