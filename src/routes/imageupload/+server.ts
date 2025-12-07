import type { RequestHandler } from "@sveltejs/kit";
import { getImageServiceClient } from "$lib/server/grpc/client";
import {Metadata} from "@grpc/grpc-js";

export const POST: RequestHandler = async ({request}): Promise<Response> => {
    console.log('----IN THE IMAGE UPLOAD ROUTE----')
    const {filename, data} = await request.json();
    console.log('Filename', filename, 'Data', data)
    const client = getImageServiceClient()
    console.log('After getting the client and ready to send grpc. Client:', client)
    const deadline = new Date(Date.now() + 5_000)
    const md = new Metadata()
    let result
    (client as any).uploadImage({filename, data: data.data}, md, {deadline}, (err: any, resp: any) => {
        if(err){
            console.error('ERROR', err)
            result = err
        }else {
            result = resp
        }
    })

    return new Response(JSON.stringify(result), {
        status: 200
    })
}