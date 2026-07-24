import { addInstagramPosts } from "$lib/server/posts/addInstagramPost";
import type { RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({ request, locals }) => {
  const body = await request.json()

  if (!body) {
    return new Response("No body", { status: 400 })
  }

  const pool = await locals.db()

  try {
    const insertRes = await addInstagramPosts(pool, JSON.parse(body))

    return new Response(JSON.stringify(insertRes))
  } catch (e) {
    return new Response("Failed to upload instagram post, " + e, { status: 500 })
  } finally {
    pool.release()
  }
}
