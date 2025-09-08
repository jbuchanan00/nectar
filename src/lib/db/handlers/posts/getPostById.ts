import type { PoolClient } from "pg";


export async function getPostById(db: PoolClient, postId: string){
    const res = await db.query(`SELECT * FROM post WHERE id = $1 order by created_at`, [postId]).then((res) => {
        let post = res.rows
        if(post.length < 1){
            console.log('No posts found')
            return {}
        }else{
            return post[0]
        }
    }).catch((err) => {
        console.log('There was an error with getting post by id', err)
        return {}
    })

    return res
}