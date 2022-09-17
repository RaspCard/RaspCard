import type { RequestHandler } from './$types';
import * as cookie from 'cookie';
import { db } from '$lib/database';


export const POST: RequestHandler = async({ request }) => {
    const { uuid, pin } = await request.json();

    if(typeof uuid !== 'string' || !uuid) {
        return new Response(JSON.stringify({success: false,  message: 'UUID invalido' }));
    }

    const user = await db.user.findUnique({
        where: {
            id: uuid
        }
    });

    if(!user) {
        return new Response(JSON.stringify({success: false, message: 'Utente non trovato' }));
    }

    return new Response(JSON.stringify({success: true, message: "Utente loggato con successo"}), { headers: {
        'set-cookie': cookie.serialize('session', uuid, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 21600
        })
    } });
}