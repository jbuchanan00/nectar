//GET /post?postId=uuid

import { getPostById } from "$lib/db/handlers/posts/getPostById";
import { type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({request, url, locals}) => {
    const postId = url.searchParams.get('postId')
    let postData;

    if(!postId || postId == ""){
        return new Response("No url")
    }

    try{
        const pool = await locals.db()

        postData = await getPostById(pool, postId)

        pool.release()
    }catch(err){
        console.log("There was an error getting post data", err)
        return new Response()
    }

    return new Response(JSON.stringify(postData))
}