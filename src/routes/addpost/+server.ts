import { addPost } from "$lib/server/posts/addPost";
import type { RequestHandler } from "@sveltejs/kit";
import { randomUUID } from "node:crypto";


export const POST: RequestHandler = async ({request, locals}) => {
    console.log("Begin AddPost Request")
    let i = +Date.now()
    const {postPayload, image, tags} = await request.json()

    const pool = await locals.db()
    try{
        postPayload.id = randomUUID()
        console.log("Complete Payload:", JSON.stringify(postPayload), "Image Id:", image, "Tags:", tags)
        try{
            await addPost(pool, postPayload, image, tags)
        }catch(e){
            return new Response(`Couldn't add post ${e}`)
        }

        // pool.release()
        console.log("Successfully Ran AddPost: ", +Date.now() - i)
        return new Response(JSON.stringify({"status": "success", "post_id": postPayload.id}))
    }catch(e){
        console.log('Error posting in post', e)
        return new Response(`Couldn't complete post`)
    }finally{
        pool.release()
    }
}