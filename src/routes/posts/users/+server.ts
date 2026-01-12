import { getPostsByUserIds } from "$lib/db/handlers/posts/getPostsByUserIds";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({url, locals}) => {
    const users = url.searchParams.getAll('user')

    if(!users){
        return new Response('No users')
    }

    const pool = await locals.db()

    const formattedUsers = users.map(user => {
        return {id: user}
    })

    try{
        const posts = await getPostsByUserIds(pool, formattedUsers)
        return new Response(JSON.stringify(posts))
    }catch(e){
        console.log('Error getting posts for posts/users:', e)
        return new Response('Error getting posts for posts/users')
    }
}

export const POST: RequestHandler = async ({request}) => {
    const {ids} = await request.json()

    if(!ids){
        return new Response('No Ids in body')
    }

    return new Response('Post method not setup yet')
}