import type { PoolClient } from "pg";
import type { Post } from "../../../../baseTypes";


export async function getPostsByUserIds(db: PoolClient, users: {id: string}[], pageSize: number): Promise<Post[]>{
    let listStr = ""
    let listNum = 1
    const list = users.map(user => {
        listStr += "$" + listNum + ","
        listNum++
        return user.id
    })
    const query = await db.query(`SELECT * FROM post WHERE user_id IN (${listStr.slice(0, -1)}) ORDER BY created_at LIMIT ` + listNum , [...list, pageSize])

    if(query.rows.length < 1){
        console.log('No posts found')
    }

    return query.rows
}