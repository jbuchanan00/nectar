import type { PoolClient } from "pg";

export default async function getTagId(db: PoolClient, tag: string): Promise<number> {
    let newId: number
    const result = (await db.query(`SELECT id FROM tag WHERE tag_name = $1`, [tag])).rows[0]
    if(!result){
        newId = (await db.query(`INSERT INTO tag (tag_name, created_at) VALUES ($1, $2) RETURNING id`, [tag, new Date()])).rows[0].id
        return newId
    }
    return result.id
}