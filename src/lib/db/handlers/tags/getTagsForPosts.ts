import type { PoolClient } from "pg";
import type { Tag } from "../../../../baseTypes";

export async function getTagsForPosts(db: PoolClient, postIds: string[], instaPostIds?: string[]): Promise<Tag[]> {
    let paramsString = ""
    let postsLength = postIds.length
    if(instaPostIds){
        postsLength += instaPostIds.length
    }
    for(let i = 0; i < postsLength; i++){
        paramsString += `$${i + 1}`
        if(i < postsLength - 1){
            paramsString += ", "
        }
    }
    let query = `SELECT pt.post_id, '' as insta_post_id, t.tag_name 
        FROM post_tag as pt LEFT JOIN tag as t on t.id = pt.tag_id 
        WHERE pt.post_id in (${paramsString})`
    if(instaPostIds){
        query += 
        `UNION ALL
        SELECT '' as post_id, pt.insta_post_id, t.tag_name
        FROM post_tag as pt LEFT JOIN tag as t on t.id = pt.insta_post_id
        WHERE pt.insta_post_id in (${paramsString})
        `
    }
    try{
        console.log("The query for tags", query)
        let paramsList = [...postIds]
        if(instaPostIds){
            paramsList.push(...instaPostIds)
        }
        const res = await db.query(query, paramsList)
        
        const rows = res.rows
        return rows
    }catch(e){
        console.log("Error getting tags for posts,", e)
        return []
    }
}