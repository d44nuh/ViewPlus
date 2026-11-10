import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function createDatabaseIfNotExists() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`Base de datos '${process.env.DB_NAME}' verificada/creada con éxito.`);
    await connection.end();
  } catch (error) {
    console.error('Error al intentar crear la base de datos:', error);
  }
}