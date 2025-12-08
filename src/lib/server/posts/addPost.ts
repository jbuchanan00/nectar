import type { PoolClient } from "pg";
import type { Post, PostTags } from "../../../baseTypes";
import { insertPost } from "$lib/db/handlers/posts/insertPost";
import { handlePostImage } from "./handlePostImage";
import { insertPostTags } from "$lib/db/handlers/tags/insertPostTags";


export async function addPost(db: PoolClient, postPayload: Post, image: string, tags: PostTags){
    console.log('-----ADDING POST-----')
    let mediaType = await handlePostImage(image)
    if(!mediaType){
        throw new Error("Error gathering media type")
    }
    postPayload.mediaType = mediaType
    try{
        await insertPost(db, postPayload)
        if(tags.length > 0){
            await insertPostTags(db, tags, postPayload.id)
        }
    }catch(e){
        console.log('Error Inserting Post To DB', e)
    }
}