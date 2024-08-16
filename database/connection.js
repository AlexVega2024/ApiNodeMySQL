import 'dotenv/config';
import mysql from 'mysql2/promise';

// Obtener variables de entorno
const usuario = process.env.DB_USER;
const host = process.env.DB_HOST;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const port = process.env.DB_PORT; 

// Configuración de la conexión usando variables de entorno
const poolConfig = {
  host,
  user: usuario,
  password,
  database,
  port
};

// Crear un pool de conexiones
export const pool = mysql.createPool(poolConfig);

const connectToMySQL = async () => {
  try {
    const [rows] = await pool.query('SELECT NOW()');
    console.log('Connected to MySQL:', rows);
  } catch (error) {
    console.log('Connection error:', error);
  }
};

// Llamar a la función para conectarse a MySQL
connectToMySQL();