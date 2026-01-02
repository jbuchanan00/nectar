import type { PoolClient } from "pg";
import type { Post, PostTags } from "../../../baseTypes";
import { insertPost } from "$lib/db/handlers/posts/insertPost";
import { insertPostImage } from "$lib/db/handlers"
import { handlePostImage } from "./handlePostImage";
import { insertPostTags } from "$lib/db/handlers/tags/insertPostTags";


export async function addPost(db: PoolClient, postPayload: Post, image: string, tags: PostTags){
    console.log('-----ADDING POST-----')
    let {mediaType, ext, filename} = await handlePostImage(db, image, postPayload.id)
    if(!mediaType){
        throw new Error("Error gathering media type")
    }
    postPayload.mediaType = mediaType
    try{
        await insertPost(db, postPayload)
        await insertPostImage(db, postPayload.id, filename)
        if(tags.length > 0){
            await insertPostTags(db, tags, postPayload.id)
        }
    }catch(e){
        console.log('Error Inserting Post To DB', e)
    }
}