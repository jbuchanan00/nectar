import { redirect, type Actions } from '@sveltejs/kit'
import { insertPost } from '$lib/db/handlers/posts/insertPost.js'
import type { Post, PostTags } from '../baseTypes.js'

export const actions: Actions = {
    upload: async ({request, locals, fetch}) => {
        const formData = await request.formData()
        let imageData = formData?.get('image') as string
        if(imageData === null){
            return
        }
        let [mime, raw] = imageData.split(',', 2)
        let [imageType] = mime.split(';', 1)
        const extension = imageType.split('/')[1] ?? 'bin'
        const determineMediaType = (ext: string): 'image' | 'gif' | 'video' | 'slideshow' => {
            if(ext === 'jpeg' || ext === 'svg+xml' || ext === 'png' || ext === 'heic'){
                return 'image'
            }else if(ext === 'gif'){
                return 'gif'
            }else if(ext === 'mp4' || ext === 'mkv'){
                return 'video'
            }else{
                return 'slideshow'
            }
        }
        const form = Object.fromEntries(formData)
        console.log('FORM', form)
        const uuidForImage = crypto.randomUUID()
        
        const filename = `${uuidForImage}.${extension}`
        const bytes = Buffer.from(raw, 'base64')

        const response = await fetch("api/imageupload", {
            method: "POST",
            body: JSON.stringify({filename, data: bytes})
        })

        if(!response.ok){
            console.error("Error in processing image upload", response.status)
            throw redirect(300, '/')
        }
        console.log('SUCCESS UPLOADING IMAGE')
        const { tags, description, role } = form
        const parsedTags: PostTags = JSON.parse(tags as string)
        const newPost: Post = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: null,
            role: parseInt(role as string),
            mediaType: determineMediaType(extension),
            body: description as string,
            likeCount: 0
        }

        try{
            const pool = await locals.db()
            await insertPost(pool, newPost, parsedTags)
            pool.release()
        }catch(e){
            console.error(`Failed to insert post, ${e}`)
        }        
        
    }
}