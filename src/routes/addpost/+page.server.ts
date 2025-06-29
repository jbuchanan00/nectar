import { error } from '@sveltejs/kit'
import {mkdir, writeFile} from 'node:fs/promises'
import path from 'node:path'
import dotenv from 'dotenv'

export const actions = {
    upload: async ({request, locals}) => {
        const formData = await request.formData()
        let imageData = formData?.get('image') as string
        if(imageData === null){
            return
        }
        let [mime, raw] = imageData.split(',', 2)
        let [imageType, encodingtype] = mime.split(';', 2)
        const extension = imageType.split('/')[1] ?? 'bin'
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
        const { tag, desc, role } = form


    }
}