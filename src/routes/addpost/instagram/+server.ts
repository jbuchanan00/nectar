import { addInstagramPosts } from "$lib/server/posts/addInstagramPost";
import type { RequestHandler } from "@sveltejs/kit";
import { keysToCamel } from '../../../lib/helpers/formatIncoming'


export const POST: RequestHandler = async ({ request, locals }) => {
  const millis = new Date().getMilliseconds()
  const body = await request.json()

  if (!body) {
    return new Response("No body", { status: 400 })
  }

  const pool = await locals.db()
  console.log("This is the raw payload", JSON.stringify(body))
  try {
    const insertRes = await addInstagramPosts(pool, JSON.parse(JSON.stringify(body)))
    console.log("Finished inserting posts from instagram in", new Date().getMilliseconds() - millis, "ms")
    return new Response(JSON.stringify(insertRes))
  } catch (e) {
    console.log("Something broke", e)
    if ((e as Error).message.includes("duplicate key value violates unique constraint")) {
      return new Response(JSON.stringify({ "status": "success" }))
    }
    return new Response(JSON.stringify({ "status": "failed" }), { status: 500 })
  } finally {
    pool.release()
  }
}
