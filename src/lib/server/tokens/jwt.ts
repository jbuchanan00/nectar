import { jwtVerify } from "jose";
import dotenv from 'dotenv'

dotenv.config()

const secret = new TextEncoder().encode(process.env.VITE_JWT_SECRET)


export async function verifyToken(token: string): Promise<{user_id: string} | null>{
    try {
        const {payload} = await jwtVerify(token, secret)
        if(!payload.user_id){
            console.log("Payload doesn't contain user_id")
        }
        return payload as {user_id: string}
    } catch(err){
        console.log('Error verifying token', err)
        if(process.env.ENVIRONMENT === 'dev'){
            return {user_id: 'f65a2220-9bd3-4e20-ae65-f2e9b40bd5f7'}
        }
        return null
    }
}
