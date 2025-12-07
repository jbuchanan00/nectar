import { addPost } from "$lib/server/posts/addPost";
import type { RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({request, locals}) => {
    const {postPayload, image, tags} = await request.json()

    try{
        const pool = await locals.db()
        try{
            await addPost(pool, postPayload, image, tags)
        }catch(e){
            return new Response(`Couldn't add post ${e}`)
        }

        pool.release()
    }catch(e){
        console.log('Error posting in post', e)
        return new Response(`Couldn't complete post`)
    }
    return new Response()
}