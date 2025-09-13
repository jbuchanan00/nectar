import type { PoolClient } from "pg";
import type { PostTags } from "../../../../baseTypes";
import getTagIds from "./getTagIds";


export async function insertPostTags(db: PoolClient, tags: PostTags, postId: string){
    let sqlPostTagQuery: string
    const listOfTags = await getTagIds(db, tags)

    sqlPostTagQuery = `INSERT INTO post_tag (tag_id, post_id) VALUES`
    for(let i = 0; i < listOfTags.length; i++){
        sqlPostTagQuery += ` ($${i * 2 + 1}, $${i * 2 + 2})`
        if(i !== listOfTags.length - 1){
            sqlPostTagQuery += `,`
        }
    }

    const values = listOfTags.map((item) => {return [Number(item), postId]})
    await db.query(sqlPostTagQuery, values.flat()).catch(e => {
        console.error("Error uploading post, ", e)
        return false
    })

    return true
}