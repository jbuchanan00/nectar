import type { RequestHandler } from "@sveltejs/kit";
import { getImageServiceClient } from "$lib/server/grpc/client";
import {Metadata} from "@grpc/grpc-js";

export const POST: RequestHandler = async ({request}): Promise<Response> => {
    const {filename, data} = await request.json();
    const client = getImageServiceClient()
    console.log('After getting the client and ready to send grpc. Client:', client)
    const deadline = new Date(Date.now() + 5_000)
    const md = new Metadata()
    const result = await new Promise<{status: String; optimized_url: string;}>((resolve, reject) => {
        (client as any).uploadImage({filename, data: data.data}, md, {deadline}, (err: any, resp: any) => {
            if(err){
                console.error('ERROR', err)
                reject(err)
            }else {
                resolve(resp)
            }
        })
    })

    return new Response(JSON.stringify(result), {
        status: 200
    })
}