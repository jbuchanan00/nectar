import type { PoolClient } from "pg";
import type { Post } from "../../../../baseTypes";


export async function getPostsByUserIds(db: PoolClient, users: {id: string}[]): Promise<Post[]>{
    const query = await db.query('SELECT * FROM post WHERE user_id IN $1 ORDER BY created_at', [users])

    if(query.rows.length < 1){
        console.log('No posts found')
    }

    return query.rows
}