import { uploadImageToRemote } from "./uploadImageToRemote"

import type { PoolClient } from "pg"

export async function handlePostImage(db: PoolClient, image: string, postId: string){
        let [mime, raw] = image.split(',', 2)
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
        const uuidForImage = crypto.randomUUID()

        const filename = `${uuidForImage}.${extension}`
        
        const bytes = Buffer.from(raw, 'base64')
        
        try{
            uploadImageToRemote(filename, bytes)
        }catch(e){
            console.log('Error in uploading image to remote', e)
        }

        return {mediaType: determineMediaType(extension), ext: extension, filename}
}