import { addInstagramPosts } from "$lib/server/posts/addInstagramPost";
import type { RequestHandler } from "@sveltejs/kit";
import { keysToCamel } from '../../../lib/helpers/formatIncoming'


export const POST: RequestHandler = async ({ request, locals }) => {
  const body = await request.json()
  console.log("here", keysToCamel(JSON.parse(JSON.stringify(body))))

  if (!body) {
    return new Response("No body", { status: 400 })
  }

  const pool = await locals.db()

  try {
    const insertRes = await addInstagramPosts(pool, JSON.parse(JSON.stringify(body)))
    console.log("successful")
    return new Response(JSON.stringify(insertRes))
  } catch (e) {
    console.log("Something broke", e)
    if ((e as Error).message.includes("duplicate key value violates unique constraint")) {
      return new Response(JSON.stringify({ "status": "success" }))
    }
    return new Response("Failed to upload instagram post, " + e, { status: 500 })
  } finally {
    pool.release()
  }
}
