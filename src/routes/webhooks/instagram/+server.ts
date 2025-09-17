import type { RequestHandler } from "@sveltejs/kit"


export const GET: RequestHandler = async ({url}) => {
    const mode = url.searchParams.get('hub.mode')
    const token = url.searchParams.get('hub.verify_token')
    const challenge = url.searchParams.get('hub.challenge')
    console.log('mode', mode, 'token', token, 'challenge', challenge, 'env', process.env.IG_WEBHOOK_VERIFY_TOKEN)
    if(mode === 'subscribe' && token === process.env.IG_WEBHOOK_VERIFY_TOKEN){
        return new Response(challenge ?? '', {
            status: 200,
            headers: {'Content-Type': 'text/plain'}
        })
    }

    return new Response('Forbidden', {status: 403})
}

export const POST: RequestHandler = async () => {

    return new Response()
}