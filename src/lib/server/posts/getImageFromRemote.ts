import { getImageServiceClient } from "$lib/server/grpc/client";
import {Metadata} from "@grpc/grpc-js";

export const getImageFromRemote = (filename: string): Promise<string> => {
    const client = getImageServiceClient()
    
    const deadline = new Date(Date.now() + 5_000)
    const md = new Metadata()
    
    const result = () => {return(new Promise((resolve, reject) => {
        (client as any).GetImage({filename}, md, (err: any, resp: any) => {
            if(err){
                console.error('ERROR', err)
                reject(err)
            }else {
                resolve(resp)
            }
        })
    }))} 
    
    return result().then((data: any) => {
        return JSON.stringify(data)
    }).catch(err => {
        console.log('Failed to retrieve image')
        return JSON.stringify(err)
    }).finally()
}