import type { Handle } from "@sveltejs/kit";

export const attachUserData: Handle = async ({event, resolve}): Promise<Response> => {


    const response = await resolve(event)
    return response
}