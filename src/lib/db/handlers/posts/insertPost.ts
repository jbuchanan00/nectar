import getTagIds from "../tags/getTagIds";
import type { PoolClient } from "pg";

import type {Post, PostTags} from '../../../../baseTypes'


const insertPost = async (db: PoolClient, postMessage: Post, tags: PostTags): Promise<void>  => {
    let sqlPostTagQuery: string
    const sqlPostQuery = `INSERT INTO post 
        (id, created_at, updated_at, role_id, media_type_id, media_id, like_count)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7))`
    const listOfTags = getTagIds(db, tags)
    await db.query(sqlPostQuery, Object.values(postMessage))
    sqlPostTagQuery = `INSERT INTO post_tag (tag_id, post_id) VALUES`
    for(let i = 0; i < listOfTags.length; i++){
        sqlPostTagQuery += ` ($1, $2)`
        if(i !== listOfTags.length - 1){
            sqlPostTagQuery += `,`
        }
    }
    const values = listOfTags.map((item) => {return [item, postMessage.id]})
    await db.query(sqlPostTagQuery, values)
}


export {insertPost}