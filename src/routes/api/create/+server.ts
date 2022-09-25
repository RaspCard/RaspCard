import type { RequestHandler } from '@sveltejs/kit';
import { checkSession } from '$lib/server/parse';
import * as cookie from 'cookie';
import { db } from '$lib/server/database';


export const POST: RequestHandler = async({ request }) => {
    const currentAdmin = await checkSession(request.headers.get('cookie') || '');

    if (!currentAdmin) {
        return new Response(JSON.stringify({success: false, message: 'Utente non loggato' }));
    }

    const body = await request.json();

    if (body.phoneNumber) {
        const user = await db.user.findFirst({
            where: {
                phoneNumber: body.phoneNumber,
                establishmentId: currentAdmin.establishmentId
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
            phoneNumber: body.phoneNumber,
            establishmentId: currentAdmin.establishmentId,
            balance: body.deposit,
        }
    });

    return new Response(JSON.stringify({success: true, message: 'Utente creato con successo' }));
};