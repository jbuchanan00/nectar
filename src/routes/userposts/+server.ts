//post/userposts?userId=string&pageSize=number&page=number

import { getPostsByUserId } from "$lib/db/handlers/posts/getPostsByUserId";
import { getTagsForPosts } from "$lib/db/handlers/tags/getTagsForPosts";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({locals, url}) => {
    console.log("Beginning User Posts Get Request")
    let i = +Date.now()
    const userId = url.searchParams.get('userId')
    const pageSize = url.searchParams.get('pageSize')
    const page = url.searchParams.get('page')

    if(!userId || !pageSize || !page){
        return new Response('Missing a query param')
    }

    const pool = await locals.db()
    try{
    
        const usersPosts = await getPostsByUserId(pool, userId, parseInt(pageSize), parseInt(page))
        const usersPostsIds = usersPosts.map(post => {
            post.tags = []
            return post.id
        })
        if(usersPosts.length < 1){
            return new Response(JSON.stringify([]))
        }

        const postTags = await getTagsForPosts(pool, usersPostsIds)

        postTags.map(tag => {
            const post = usersPosts.find(post => post.id == tag.post_id)
            if(!post || !post.tags) return;
            post.tags.push(tag.tag_name)
        })
    
        // pool.release()

        console.log("Ending User Posts Get Request: ", +Date.now() - i)
    
        return new Response(JSON.stringify(usersPosts))
    }catch(e){
        console.log("Error sending out posts for user,", e)
        return Response.error()
    }finally{
        pool.release()
    }

}   