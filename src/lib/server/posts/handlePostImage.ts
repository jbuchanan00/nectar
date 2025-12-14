import { uploadImageToRemote } from "./uploadImageToRemote"
import { insertPostImage } from "$lib/db/handlers"

export async function handlePostImage(image: string){
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

        // try{
        //     await insertPostImage('', uuidForImage)
        // }catch(e){
        //     console.log('Error uploading image id', e)
        // }
        
        const filename = `${uuidForImage}.${extension}`
        const bytes = Buffer.from(raw, 'base64')
        
        try{
            uploadImageToRemote(filename, bytes)
        }catch(e){
            console.log('Error in uploading image to remote', e)
        }

        return determineMediaType(extension)
}