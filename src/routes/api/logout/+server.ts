import type { RequestHandler } from './$types';
import * as cookie from 'cookie';
import { db } from '$lib/server/database';


export const POST: RequestHandler = async() => {
    return new Response(undefined, {
        headers: {
            'set-cookie': cookie.serialize('session', '', {
                expires: new Date(0),
            })
        }
    });
}