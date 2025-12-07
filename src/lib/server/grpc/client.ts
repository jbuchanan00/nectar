import path from "node:path"
import { credentials, ChannelCredentials, Client, loadPackageDefinition } from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"

const PROTO_PATH = path.resolve("protos/image_service.proto")

let _client: any | null = null

export function getImageServiceClient(){
    console.log('Getting Image Service Client')
    if(_client) return _client;

    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
        keepCase: false,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
        includeDirs: [path.resolve("protos")]
    })

    const protoDesc = (loadPackageDefinition(packageDefinition) as any).image.v1
    
    const host = process.env.GRPC_IMAGE_HOST ?? "localhost";
    const port = process.env.GRPC_IMAGE_PORT ?? 9090;

    const creds: ChannelCredentials = 
    process.env.GRPC_TSL == "1"
        ? credentials.createSsl()
        : credentials.createInsecure();
    
    _client = new protoDesc.ImageService(`${host}:${port}`, creds) as Client;
    return _client;
}