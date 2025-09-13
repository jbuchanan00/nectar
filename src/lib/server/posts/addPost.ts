import type { PoolClient } from "pg";
import type { Post, PostTags } from "../../../baseTypes";
import { insertPost } from "$lib/db/handlers/posts/insertPost";
import { handlePostImage } from "./handlePostImage";
import { insertPostTags } from "$lib/db/handlers/tags/insertPostTags";


export async function addPost(db: PoolClient, postPayload: Post, image: string, tags: PostTags){
    let mediaType = await handlePostImage(image)
    if(!mediaType){
        console.log("Error gathering media type")
        return false
    }
    postPayload.mediaType = mediaType
    await insertPost(db, postPayload)
    await insertPostTags(db, tags, postPayload.id)
}