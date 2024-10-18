//Import Pool class from pg package to use for connection pooling
import pkg from 'pg';
const { Pool } = pkg;

//Import functionality to connect with .env file
import dotenv from 'dotenv';
dotenv.config();

//Creates the connection
const db = new Pool({
    connectionString: process.env.DB_URI
  });

//Export db object for server to import and use  
export default db;