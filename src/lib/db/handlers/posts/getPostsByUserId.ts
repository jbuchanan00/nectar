import type { PoolClient } from "pg";


export async function getPostsByUserId(db: PoolClient, userId: string, pageSize: number, page: number){
    const rowsToSkip = pageSize * page
    const res = await db.query('SELECT * FROM post as p LEFT JOIN post_image as pi on p.id = pi.post_id WHERE p.user_id=$1 ORDER BY created_at desc LIMIT $2 OFFSET $3', [userId, pageSize, rowsToSkip]).then((res) => {
        return res.rows
    })

    return res
}