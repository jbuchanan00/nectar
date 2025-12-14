import type { Handle } from "@sveltejs/kit";
import { verifyToken } from "$lib/server/tokens";

export const attachUserData: Handle = async ({event, resolve}): Promise<Response> => {
    const token = event.cookies.get('jwt')
    if(token){
        const userJwt = await verifyToken(token)
        if(userJwt?.user_id){
            console.log('JWT', userJwt.user_id)
            event.locals.userId = userJwt.user_id
        }else{
            console.log("Could'nt find user_id on the token")
        }
    }
    else{
        console.log('No Token')
    }
    if(process.env.ENVIORNMENT === "dev" && !token){
        event.locals.userId = '11111111-1111-1111-1111-111111111111'
    }

    const response = await resolve(event)
    return response
}