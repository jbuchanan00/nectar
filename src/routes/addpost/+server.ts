import { addPost } from "$lib/server/posts/addPost";
import type { RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({request, locals}) => {
    const {postPayload, image, tags} = await request.json()

    try{
        const pool = await locals.db()
        const res = await addPost(pool, postPayload, image, tags)
        if(!res){
            throw new Error(`Couldn't add post`)
        }
        pool.release()
    }catch(e){
        console.log('Error posting in post', e)
        throw new Error(`Couldn't complete post`)
    }
    return new Response()
}