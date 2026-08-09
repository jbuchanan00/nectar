import type { PoolClient } from "pg";
import type { InstagramPost } from "../../../baseTypes";


export async function addInstagramPosts(db: PoolClient, payload: InstagramPost[]) {
  const query = "INSERT INTO instagram_post (id, created_at, user_id, media_type, permalink, media_ext, caption) VALUES "
  let values = ""
  let data = []
  for (let i = 0; i < payload.length; i++) {
    let date = new Date(payload[i].timestamp).toLocaleString()
    values += `($${i * 7 + 1}, $${i * 7 + 2}, $${i * 7 + 3}, $${i * 7 + 4}, $${i * 7 + 5}, $${i * 7 + 6}, $${i * 7 + 7})`
    if (i != payload.length - 1) {
      values += ", "
    }
    data.push(payload[i].id, date, payload[i].user_id, payload[i].media_type, payload[i].permalink, payload[i].photoExt ?? null, payload[i].caption ?? null)
  }
  console.log(query + values, " ", data)
  const res = await db.query(query + values, data);
  return res.rows
}
