import { error } from '@sveltejs/kit'
import {mkdir, writeFile} from 'node:fs/promises'
import path from 'node:path'
import { insertPost } from '$lib/db/handlers/posts/insertPost.js'
import type { Post, PostTags, Role } from '../../baseTypes.js'

export const actions = {
    upload: async ({request, locals}) => {
        const formData = await request.formData()
        let imageData = formData?.get('image') as string
        if(imageData === null){
            return
        }
        let [mime, raw] = imageData.split(',', 2)
        let [imageType] = mime.split(';', 1)
        const extension = imageType.split('/')[1] ?? 'bin'
        const determineMediaType = (ext: string): 'image' | 'gif' | 'video' | 'slideshow' => {
            console.log(ext)
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
 
        const uuidForImage = crypto.randomUUID()
        
        const filename = `${uuidForImage}.${extension}`
        const uploadDir = process.env.UPLOAD_DIR ?? '/app/uploads/'
        const fullPath = path.join(uploadDir, filename)
        const bytes = Buffer.from(raw, 'base64')

        try{
            await mkdir(`${uploadDir}`, {recursive: true})
            await writeFile(fullPath, bytes)
        }catch(e){
            console.error('Failed to save image to disk', e)
            throw error(401, {message: "Error saving image"})
        }
        console.log('SUCCESS')
        const { tags, description, radio } = form
        const parsedTags: PostTags = JSON.parse(tags as string)
        const newPost: Post = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: null,
            role: radio.toString().toLowerCase() as Role,
            mediaType: determineMediaType(extension),
            mediaId: uuidForImage,
            body: description as string,
            likeCount: 0
        }

        try{
            await insertPost(locals.db, newPost, parsedTags)
        }catch(e){
            console.error(`Failed to insert post, ${e}`)
        }        
        
    }
}