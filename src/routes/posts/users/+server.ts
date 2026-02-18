import { getPostsByUserIds } from "$lib/db/handlers/posts/getPostsByUserIds";
import { getTagsForPost } from "$lib/db/handlers/tags/getTagsForPost";
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
        const posts = await getPostsByUserIds(pool, formattedUsers, 25)
        const postsWTag = posts.forEach(async post => {
            const tags = await getTagsForPost(pool, post.id)
            return {...post, tags}
        })
        return new Response(JSON.stringify(postsWTag))
    }catch(e){
        console.log('Error getting posts for posts/users:', e)
        return new Response('Error getting posts for posts/users')
    }
}

export const POST: RequestHandler = async ({request, locals}) => {
    const req = await request.json()
    let pool
    console.log("Request", req)
    const ids = req.ids
    console.log("Ids: ", ids)
    if(!ids || ids.length < 1){
        return new Response('No Ids in body')
    }
    try{
        pool = await locals.db()
    }catch(e){
        console.log("Error connecting to db", e)
        return new Response('Error connecting to db', {status: 500})
    }

    try{
        const posts = await getPostsByUserIds(pool, ids, 25)
        console.log("First posts:", posts)
        const postsWTag = await Promise.all(posts.map(async post => {
            const tags = await getTagsForPost(pool, post.id)
            return {...post, tags, source: "inkedout"}
        }))
        
        return new Response(JSON.stringify(postsWTag))
    }catch(e){
        console.log('Error getting posts for posts/users:', e)
        return new Response('Error getting posts for posts/users')
    }
}