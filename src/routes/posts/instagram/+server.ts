import type { RequestHandler } from "@sveltejs/kit";
import type { InstagramPost } from "../../../baseTypes";
import { insertInstagramPost } from "$lib/db/handlers";



export const POST: RequestHandler = async ({request, locals}) => {
    const {posts, userId} = await request.json()

    if(!posts || posts.length < 1){
        return new Response('No posts', {status: 400})
    }

    const formattedUsers = []
    for(let i = 0; i < posts.length; i++){
        const formattedUser: InstagramPost = {id: posts[i].id, createdAt: posts[i].timestamp, userId,
            mediaType: posts[i].media_type, mediaUrl: posts[i].media_url, permalink: posts[i].permalink, caption: posts[i].caption}
        formattedUsers.push(formattedUser)
    }

    try{
        const pool = await locals.db()

        await insertInstagramPost(pool, formattedUsers)

        return new Response('Successfuly inserted instagram posts')
    }catch(e){
        console.log("Error inserting instagram posts", e)
        return new Response('Error inserting instagram posts', {status: 400})
    }
}