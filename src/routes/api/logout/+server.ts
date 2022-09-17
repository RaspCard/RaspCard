import type { RequestHandler } from './$types';
import * as cookie from 'cookie';
import { db } from '$lib/database';


export const POST: RequestHandler = async() => {
    return new Response(JSON.stringify({success: true, message: "Logout effettuato con successo"}), {
        headers: {
            'set-cookie': cookie.serialize('session', '', {
                expires: new Date(0),
            })
        }
    });
}