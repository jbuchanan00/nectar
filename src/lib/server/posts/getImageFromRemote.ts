import { getImageServiceClient } from "$lib/server/grpc/client";
import {Metadata} from "@grpc/grpc-js";

export const getImageFromRemote = (filename: string) => {
    const client = getImageServiceClient()
    
    const deadline = new Date(Date.now() + 5_000)
    const md = new Metadata()
    let result
    (client as any).GetImage({filename}, md, {deadline}, (err: any, resp: any) => {
        if(err){
            console.error('ERROR', err)
            result = err
        }else {
            console.log('Successful response:', resp)
            result = resp
        }
    })
    return result
}