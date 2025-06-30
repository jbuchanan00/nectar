import type { PostTags } from "../../../../baseTypes";
import type { PoolClient } from "pg";
import getTagId from "./getTagId";

export default function getTagIds(db: PoolClient, list: PostTags): Promise<number>[] {
    let listOfIds = list.tags.map(async (item) => await getTagId(db, item))
    return listOfIds
}