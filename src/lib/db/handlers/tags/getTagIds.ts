import type { PostTags } from "../../../../baseTypes";
import type { PoolClient } from "pg";
import getTagId from "./getTagId";

export default async function getTagIds(db: PoolClient, list: PostTags): Promise<number[]> {
    let listOfIds = []
    for(const item in list){
        listOfIds.push(getTagId(db, item))
    }
    listOfIds = await Promise.all(listOfIds)
    return listOfIds
}