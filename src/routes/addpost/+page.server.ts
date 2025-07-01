import { error } from '@sveltejs/kit'
import {mkdir, writeFile} from 'node:fs/promises'
import path from 'node:path'
import type { Post, PostTags } from '../../baseTypes.js'
import { existsSync } from 'node:fs'

export const actions = {
    upload: async ({request, locals}) => {
        const formData = await request.formData()
        const formTags = formData?.get('tags')
        let imageData = formData?.get('image') as string
        if(imageData === null){
            return
        }
        let [mime, raw] = imageData.split(',', 2)
        let [imageType] = mime.split(';', 1)
        const extension = imageType.split('/')[1] ?? 'bin'
        const determineMediaType = (ext: string): 'image' | 'gif' | 'video' | 'slideshow' => {
            if(ext in ['jpeg', 'svg+xml', 'png', 'heic']){
                return 'image'
            }else if(ext in ['gif']){
                return 'gif'
            }else if(ext in ['mp4', 'mkv']){
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
        const { desc, role } = form
        console.log('TAG', Array.from(formData), Object.fromEntries(formData))
        const newPost: Post = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: null,
            role: role as 'canvas' | 'artist' | 'shop',
            mediaType: determineMediaType(extension),
            mediaId: uuidForImage,
            desc: desc as string,
            likeCount: 0
        }

        let tagToString: string[]

        

        // const tagsForPost: PostTags = {
        //     tags: tags as string[]
        // }
    }
}