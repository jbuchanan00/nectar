import { getImageFromRemote } from '$lib/server/posts/getImageFromRemote';
import type {RequestHandler} from '@sveltejs/kit'
export const GET: RequestHandler = async ({url}) => {
    const imageId = url.searchParams.get('imageid')
    console.log('ImageId being Requested', imageId)

    let response;
    let result;
    if(!imageId){
        return new Response('No Image Id found in URL')
    }
    try{
        response = await getImageFromRemote(imageId)
        response = JSON.parse(response)
        result = new Uint8Array(response.data.data)
    }catch(e){
        return new Response(`Error retrieving image: ${e}`)
    }

    return new Response(result)
}