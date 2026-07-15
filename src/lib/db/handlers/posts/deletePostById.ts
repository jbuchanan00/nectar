import type { PoolClient } from "pg";


export async function deletePostById(db: PoolClient, id: string) {
    const query = "DELETE FROM post WHERE id=$1"

    const res = await db.query(query, [id])

    return res.rows;
}