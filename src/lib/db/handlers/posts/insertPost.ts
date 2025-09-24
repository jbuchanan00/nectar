import getTagIds from "../tags/getTagIds";
import convertFieldsToIds from "./convertFieldsToIds";
import type { PoolClient } from "pg";

import type {Post, PostTags} from '../../../../baseTypes'


const insertPost = async (db: PoolClient, postMessage: Post): Promise<void>  => {
    await convertFieldsToIds(db, postMessage)
    const sqlPostQuery = `INSERT INTO post 
        (id, created_at, updated_at, role_id, media_type_id, body, user_id)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7)`
    
    await db.query(sqlPostQuery, Object.values(postMessage))

}


export {insertPost}