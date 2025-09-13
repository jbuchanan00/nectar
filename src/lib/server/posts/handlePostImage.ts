

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
        
        const filename = `${uuidForImage}.${extension}`
        const bytes = Buffer.from(raw, 'base64')

        const response = await fetch("api/imageupload", {
            method: "POST",
            body: JSON.stringify({filename, data: bytes})
        })

        if(!response.ok){
            console.error("Error in processing image upload", response.status)
            return false
        }
        console.log('SUCCESS UPLOADING IMAGE')
        return determineMediaType(extension)
}