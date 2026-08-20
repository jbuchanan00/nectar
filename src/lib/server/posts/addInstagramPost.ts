import type { PoolClient } from "pg";
import type { InstagramPost } from "../../../baseTypes";


export async function addInstagramPosts(db: PoolClient, payload: InstagramPost[]) {
  const query = "INSERT INTO instagram_post (id, created_at, user_id, media_type, permalink, media_ext, caption) VALUES "
  let values = ""
  let imageValues = ""
  let data = []
  let imageData: string[] = []
  for (let i = 0; i < payload.length; i++) {
    let date = new Date(payload[i].timestamp).toLocaleString()
    values += `($${i * 7 + 1}, $${i * 7 + 2}, $${i * 7 + 3}, $${i * 7 + 4}, $${i * 7 + 5}, $${i * 7 + 6}, $${i * 7 + 7})`
    imageValues += `($${i * 2 + 1}, $${i * 2 + 2})`
    if (i != payload.length - 1) {
      imageValues += ", "
      values += ", "
    }
    imageData.push(payload[i].image_id, payload[i].id)
    data.push(payload[i].id, date, payload[i].user_id, payload[i].media_type, payload[i].permalink, payload[i].photoExt ?? null, payload[i].caption ?? null)
  }
  const imageQuery = "INSERT INTO post_image (image_id, insta_post_id) VALUES "
  console.log(query + values, " ", data)
  await db.query("BEGIN;")
  const res = await db.query(query + values, data);
  const imageRes = await db.query(imageQuery + imageValues, imageData)
  await db.query("COMMIT;")
  return res.rows
}
