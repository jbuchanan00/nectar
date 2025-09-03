import type { PostTags } from "../../../../baseTypes";
import type { PoolClient } from "pg";
import getTagId from "./getTagId";

export default async function getTagIds(db: PoolClient, list: PostTags): Promise<number[]> {
    let listOfIds = []
    for(const i in list){
        listOfIds.push(getTagId(db, list[i]))
    }
    listOfIds = await Promise.all(listOfIds)
    return listOfIds
}