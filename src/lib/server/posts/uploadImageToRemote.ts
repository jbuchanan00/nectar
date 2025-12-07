import { getImageServiceClient } from "$lib/server/grpc/client";
import {Metadata} from "@grpc/grpc-js";

export const uploadImageToRemote = (filename: string, data: Buffer<ArrayBuffer>) => {
    const client = getImageServiceClient()
    
    const deadline = new Date(Date.now() + 5_000)
    const md = new Metadata()
    let result
    (client as any).uploadImage({filename, data}, md, {deadline}, (err: any, resp: any) => {
        if(err){
            console.error('ERROR', err)
            result = err
        }else {
            result = resp
        }
    })
}