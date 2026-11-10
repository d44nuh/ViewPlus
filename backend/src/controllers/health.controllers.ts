import type { Request, Response } from 'express';
import sequelize from '../config/database.ts'; // Ajusta a la ruta de tu instancia de Sequelize

export const getHealthStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    // Consulta directa a la base de datos para validar conectividad real
    await sequelize.authenticate();

    res.status(200).json({
      status: 'success',
      message: 'Sistema ViewPlus Backend funcionando correctamente',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        server: 'online',
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Fallo en la conexión a la base de datos',
      services: {
        database: 'disconnected',
        server: 'online',
      },
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};