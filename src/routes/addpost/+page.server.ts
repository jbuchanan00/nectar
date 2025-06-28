import { error } from '@sveltejs/kit'
import {writeFile} from 'node:fs/promises'
import { extname } from 'node:path'

export const actions = {
    upload: async ({request, locals}) => {
        const formData = await request.formData()
        const form = Object.fromEntries(formData)
        console.log('FORM', formData)
        const uploadedFile = formData?.get('file')
        const uuidForImage = crypto.randomUUID()
        if(!(uploadedFile instanceof File)){
            error(401, {message: 'Incorrect file type'})
        }

        const filename = `upload/${uuidForImage}${extname(uploadedFile?.name)}`
        // try{
        //     await writeFile(filename, Buffer.from(await uploadedFile?.arrayBuffer()))
        // }catch(e){
        //     console.error('Failed to save image to disk')
        // }

        // const { tag, desc, role } = form as {
        //     tag: string[];
        //     desc: string;
        //     role: string;
        // }
    }
}