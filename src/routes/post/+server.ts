//GET /post?postId=uuid

import { getPostById } from "$lib/db/handlers/posts/getPostById";
import { type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({request, url, locals}) => {
    console.log("Get Post by id Started")
    let i = +Date.now()
    const postId = url.searchParams.get('postId')
    let postData;

    if(!postId || postId == ""){
        return new Response("No url")
    }

    const pool = await locals.db()
    try{

        postData = await getPostById(pool, postId)
        console.log("Successful Get Post by Id: ", +Date.now()-i)
        // pool.release()
    }catch(err){
        console.log("There was an error getting post data", err)
        return new Response()
    }finally{
        pool.release()
    }

    return new Response(JSON.stringify(postData))
}
