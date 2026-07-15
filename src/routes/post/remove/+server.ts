import { deletePostById } from "$lib/db/handlers/posts/deletePostById";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({ url, locals }) => {
    const postId = url.searchParams.get("id")

    if (!postId || postId == "") {
        return new Response("No post id included", { status: 400 })
    }

    const pool = await locals.db()

    try {
        const res = await deletePostById(pool, postId)
    } catch (e) {
        console.log("Couldn't remove post", e)
        return new Response("Couldn't remove post" + e, { status: 500 })
    } finally {
        pool.release()
    }

    return new Response
}