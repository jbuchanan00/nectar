import type { PoolClient } from "pg";


export default async function(db: PoolClient, post_id: string, image_id: string): Promise<void> {
    try{
        await db.query(`INSERT INTO post_image (post_id, image_id) VALUES($1, $2)`, [post_id, image_id])
    }catch(e){
        throw new Error('Error in db insert')
    }
}