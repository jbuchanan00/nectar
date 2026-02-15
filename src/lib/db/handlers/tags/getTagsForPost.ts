import type { PoolClient } from "pg";


export async function getTagsForPost(db: PoolClient, postId: string){
    const query = "SELECT tag.tag_name, post_tag.post_id FROM tag LEFT JOIN post_tag ON tag.id = post_tag.tag_id WHERE post_tag.post_id = $1"

    return await db.query(query, [postId]).then(res => {
        return res.rows
    }).catch(err => {
        console.log('Error getting tags for post: ', postId)
        return []
    })
}