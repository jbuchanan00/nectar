import type { PoolClient } from "pg";
import type { MediaType } from "../../../../baseTypes";


export default async function(db: PoolClient, media: MediaType): Promise<number> {
    return await db.query(`SELECT id FROM media_type WHERE type_name = $1`, [media]).then(res => {
        console.log(media, res.rows)
        return parseInt(res.rows[0].id)
    })
}