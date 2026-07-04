import type { PoolClient } from "pg";
import type { Post, PostTags } from "../../../baseTypes";
import { insertPost } from "$lib/db/handlers/posts/insertPost";
import { insertPostTags } from "$lib/db/handlers/tags/insertPostTags";
import insertPostImageId from "$lib/db/handlers/media/insertPostImageId";


export async function addPost(db: PoolClient, postPayload: Post, imageId: string, tags: PostTags){
    console.log('-----ADDING POST-----')
    
    try{
        await insertPost(db, postPayload)
        await insertPostImageId(db, postPayload.id, imageId, "native")
        if(tags.length > 0){
            await insertPostTags(db, tags, postPayload.id)
        }
    }catch(e){
        console.log('Error Inserting Post To DB', e)
    }
}