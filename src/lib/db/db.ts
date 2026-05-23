import pkg from 'pg'
const {Pool} = pkg
import dotenv from 'dotenv'


dotenv.config()

const pool = new Pool({
  user: process.env.POSTGRES_USER_NECTAR,
  host: process.env.POSTGRES_HOST_NECTAR,
  database: process.env.POSTGRES_DB_NECTAR,
  password: process.env.POSTGRES_PASSWORD_NECTAR,
  port: parseInt(process.env.POSTGRES_PORT_NECTAR!)
});

export const connectToDB = () => pool.connect();