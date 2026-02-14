import pkg from 'pg'
const {Pool} = pkg
import dotenv from 'dotenv'


dotenv.config()
console.log("DB: ", process.env.POSTGRES_USER, process.env.POSTGRES_HOST, process.env.POSTGRES_DB, process.env.POSTGRES_PASSWORD, parseInt(process.env.POSTGRES_PORT!))

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT!)
});

export const connectToDB = () => pool.connect();