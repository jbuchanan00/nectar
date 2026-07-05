import type { PoolClient } from "pg";
import type { Post } from "../../../../baseTypes";


export async function getPostsByUserIds(db: PoolClient, users: {id: string}[], pageSize: number): Promise<Post[]>{
    let listStr = ""
    let listNum = 1
    const list = users.map(user => {
        listStr += "$" + listNum + ","
        listNum++
        return user.id
    })
    
    const query = await db.query(`SELECT post.id, post.created_at, post.body, post.media_ext, media_type.type_name as media_type, post_image.image_id, '' as permalink, 'inkedout' as source 
        FROM post 
        LEFT JOIN post_image ON post_image.post_id = post.id
		LEFT JOIN media_type ON media_type.id = post.media_type_id
        WHERE user_id IN (${listStr.slice(0, -1)}) 
        UNION ALL
        SELECT instagram_post.id, instagram_post.created_at, instagram_post.caption as body, instagram_post.media_ext, instagram_post.media_type, post_image.image_id, instagram_post.permalink, 'instagram' as source
        FROM instagram_post
        LEFT JOIN post_image ON post_image.insta_post_id = instagram_post.id
        WHERE user_id IN (${listStr.slice(0, -1)})
        ORDER BY created_at LIMIT $` + listNum , [...list, pageSize])

    if(query.rows.length < 1){
        console.log('No posts found')
    }

    return query.rows
}