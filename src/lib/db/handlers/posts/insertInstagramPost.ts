import type { PoolClient } from "pg"
import type { InstagramPost } from "../../../../baseTypes"


export async function insertInstagramPost(db: PoolClient, postInfo: InstagramPost[]){
        let postInfoList = []
        let postInfoString = ''
        for(let i = 0; i < postInfo.length; i++){
            postInfoString += `($${i*7+1}, $${i*7+2}, $${i*7+3}, $${i*7+4}, $${i*7+5}, $${i*7+6}, $${i*7+7})`
            if(i !== postInfo.length - 1){
                postInfoString += ', '
            }
            postInfoList.push(postInfo[i].id, postInfo[i].createdAt, postInfo[i].userId, 
                postInfo[i].mediaType, postInfo[i].mediaUrl, postInfo[i].permalink, postInfo[i].caption)
        }
        try{
        await db.query('BEGIN;')
        await db.query(`INSERT INTO instagram_post (id, created_at, user_id, media_type, media_url, permalink, caption) 
            VALUES ${postInfoString}`, 
            [...postInfoList])
        await db.query(`COMMIT;`)
    }catch(e){
        await db.query(`ROLLBACK;`)
        console.log('Error inserting post image:', e)
        throw new Error('Error in db insert')
    }
}