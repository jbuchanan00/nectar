import type { PoolClient } from "pg";
import type { Tag } from "../../../../baseTypes";

export async function getTagsForPosts(db: PoolClient, postIds: string[]): Promise<Tag[]> {
    let paramsString = ""
    for(let i = 0; i < postIds.length; i++){
        paramsString += `$${i + 1}`
        if(i < postIds.length - 1){
            paramsString += ", "
        }
    }
    const query = `SELECT pt.post_id, t.tag_name FROM post_tag as pt LEFT JOIN tag as t on t.id = pt.tag_id WHERE pt.post_id in (${paramsString})`
    try{
        const res = await db.query(query, postIds)
        
        const rows = res.rows
        return rows
    }catch(e){
        console.log("Error getting tags for posts,", e)
        return []
    }
}