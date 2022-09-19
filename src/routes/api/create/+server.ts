import type { RequestHandler } from '@sveltejs/kit';
import * as cookie from 'cookie';
import { db } from '$lib/server/database';


export const POST: RequestHandler = async({ request }) => {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const session = cookies.session;

    if (!session) {
        return new Response(JSON.stringify({success: false, message: 'Utente non loggato' }));
    } 

    // TODO change user table to admin table
    const currentUser = await db.user.findUnique({ where: { id: session } });

    if (!currentUser) {
        return new Response(JSON.stringify({success: false, message: 'Utente non trovato' }));
    }

    const body = await request.json();
    const phoneNumber = parseInt(body.phoneNumber);

    if (phoneNumber) {
        const user = await db.user.findFirst({
            where: {
                phoneNumber: phoneNumber,
                establishmentId: currentUser.establishmentId
            }
        });

        if (user) {
            return new Response(JSON.stringify({success: false, message: 'Numero di telefono già in uso' }));
        }
    }

    // TODO add check for migrationID and migration it self

    await db.user.create({
        data: {
            name: body.name,
            surname: body.surname,
            phoneNumber: phoneNumber,
            establishmentId: currentUser.establishmentId,
            balance: body.deposit
        }
    });

    return new Response(JSON.stringify({success: true, message: 'Utente creato con successo' }));
};