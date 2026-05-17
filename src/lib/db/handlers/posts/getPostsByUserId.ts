import type { PoolClient } from "pg";
import type { Post } from "../../../../baseTypes";


export async function getPostsByUserId(db: PoolClient, userId: string, pageSize: number, page: number): Promise<Post[]>{
    const rowsToSkip = pageSize * (page - 1)
    const res = await db.query('SELECT p.*, pi.image_id FROM post as p LEFT JOIN post_image as pi on p.id = pi.post_id WHERE p.user_id=$1 ORDER BY created_at desc LIMIT $2 OFFSET $3', [userId, pageSize, rowsToSkip]).then((res) => {
        return res.rows
    })

    return res
}