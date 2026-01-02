//post/userposts?userId=string&pageSize=number&page=number

import { getPostsByUserId } from "$lib/db/handlers/posts/getPostsByUserId";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({locals, url}) => {
    const userId = url.searchParams.get('userId')
    const pageSize = url.searchParams.get('pageSize')
    const page = url.searchParams.get('page')

    if(!userId || !pageSize || !page){
        return new Response('Missing a query param')
    }

    const pool = await locals.db()

    const usersPosts = await getPostsByUserId(pool, userId, parseInt(pageSize), parseInt(page))

    pool.release()

    console.log('Sending Out Posts:', JSON.stringify(usersPosts))

    return new Response(JSON.stringify(usersPosts))

}   