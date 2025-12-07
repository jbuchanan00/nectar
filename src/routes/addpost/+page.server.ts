import { redirect, type Actions } from '@sveltejs/kit'
import { addPost } from '$lib/server/posts/addPost.js'
import type { Post, PostTags } from '../../baseTypes.js'

export const actions: Actions = {
    upload: async ({request, locals}) => {
        const formData = await request.formData()
        let imageData = formData?.get('image') as string
        if(imageData === null){
            return
        }
        const form = Object.fromEntries(formData)

        const { tags, description, role } = form
        const parsedTags: PostTags = JSON.parse(tags as string)
        const newPost: Post = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: null,
            role: parseInt(role as string),
            mediaType: null,
            body: description as string,
            userId: ''
        }
        console.log('Post:', JSON.stringify(newPost))
        try{
            const pool = await locals.db()
            await addPost(pool, newPost, imageData, parsedTags)
            pool.release()
        }catch(e){
            console.error(`Failed to insert post, ${JSON.stringify(e)}`)
        }  
        throw redirect(307, '/')      
    }
}