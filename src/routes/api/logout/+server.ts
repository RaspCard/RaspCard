import type { RequestHandler } from './$types';
import * as cookie from 'cookie';


export const POST: RequestHandler = async() => {
    return new Response(undefined, {
        headers: {
            'Set-Cookie': cookie.serialize('session', '', {
                path: '/',
                expires: new Date(0)
            })
        }
    });
}