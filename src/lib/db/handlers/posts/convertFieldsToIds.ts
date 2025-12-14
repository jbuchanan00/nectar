import getRoleId from "../roles/getRoleId";
import getMediaTypeId from "../media/getMediaTypeId";

import type { PoolClient } from "pg";
import type { MediaType, Post, Role } from "../../../../baseTypes";


export default async function convertFieldsToIds(db: PoolClient, post: Post): Promise<Post>{
    if(isNaN(post.role as number)){
        post.role = await getRoleId(db, post.role as Role)
    }
    if(isNaN(post.mediaType as number)){
        post.mediaType = await getMediaTypeId(db, post.mediaType as MediaType)
    }
    
    return post
}