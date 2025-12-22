import { getImageFromRemote } from '$lib/server/posts/getImageFromRemote';
import type {RequestHandler} from '@sveltejs/kit'
export const GET: RequestHandler = ({url}) => {
    const imageId = url.searchParams.get('imageid')

    let response;
    if(!imageId){
        return new Response('No Image Id found in URL')
    }
    try{
        response = getImageFromRemote(imageId)
        console.log('The response from remote is', response)
    }catch(e){
        return new Response(`Error retrieving image: ${e}`)
    }

    return new Response(JSON.stringify(response))
}