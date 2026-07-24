import type { PoolClient } from "pg";
import type { InstagramPost } from "../../../baseTypes";


export async function addInstagramPosts(db: PoolClient, payload: InstagramPost[]) {
  const query = "INSERT INTO instagram_post (id, created_at, user_id, media_type, permalink, media_ext) VALUES "
  let values = ""
  let data = []
  for (let i = 0; i < payload.length; i++) {
    values += `(${i + 1}, ${i + 2}, ${i + 3}, ${i + 4}, ${i + 5})`
    if (i != payload.length - 1) {
      values += ", "
    }
    data.push(payload[i].id, payload[i].timestamp, payload[i].userId, payload[i].media_type, payload[i].permalink, payload[i].photoExt)
  }
  const res = await db.query(query + values, data);
  return res.rows
}
