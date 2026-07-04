import type { PoolClient } from "pg";


export default async function(db: PoolClient, post_id: string, image_id: string, source: string): Promise<void> {
    let column = "";
    switch(source){
        case("instagram"): 
            column = "insta_post_id"
            break;
        case("native"):
            column = "post_id"
            break;
        default:
            column = ""
    }
    try{
        await db.query('BEGIN;')
        await db.query(`INSERT INTO post_image (${column}, image_id) VALUES ($1, $2);`, [post_id, image_id])
        await db.query(`COMMIT;`)
    }catch(e){
        await db.query(`ROLLBACK;`)
        console.log('Error inserting post image:', e)
        throw new Error('Error in db insert')
    }
}