import type { RequestHandler } from "@sveltejs/kit";
import { uploadImageToRemote } from "$lib/server/posts/uploadImageToRemote";

export const POST: RequestHandler = async ({request}): Promise<Response> => {
    console.log('----IN THE IMAGE UPLOAD ROUTE----')
    const {filename, data} = await request.json();
    
    try{
        uploadImageToRemote(filename, data)
    }catch(e){
        return new Response('Error uploading image')
    }

    return new Response('Uploaded Image...Hopefully')
}