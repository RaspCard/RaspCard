// import type { RequestHandler } from "@sveltejs/kit";
import type { RequestHandler } from './$types';
import { db } from '$lib/database';


export const POST: RequestHandler = async({ request }) => {
    console.log("post");
    const { uuid } = await request.json();

    if(typeof uuid !== 'string' || !uuid) {
        return new Response(JSON.stringify({success: false,  error: 'UUID invalido' }));
    }

    const user = await db.user.findUnique({
        where: {
            id: uuid
        }
    });

    if(!user) {
        return new Response(JSON.stringify({success: false, error: 'Utente non trovato' }));
    }

    console.log("here");

    const headers = new Headers();
    headers.append('set-cookie', `session=${uuid}; HttpOnly; SameSite=Strict; Path=/`);
    return new Response(JSON.stringify({success: true, message: "Utente creato con successo"}), { headers });
}

// a9281392-4f0e-41dc-8f6f-2077e683f201