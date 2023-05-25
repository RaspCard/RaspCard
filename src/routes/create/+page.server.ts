import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/database';
import type { CardRequest } from '$lib/utils/types';


export const load: PageServerLoad = async({ locals }) => {
    if(!locals.currentAdmin) {
        throw redirect(302, '/login');
    }
}


export const actions: Actions = {
    async default({request, locals}) {
        if(!locals.currentAdmin) {
            return fail(401);
        }

        const data = Object.fromEntries(await request.formData()) as unknown as CardRequest;

        if(!data.cardId || typeof(data.cardId) !== 'string') {
            return fail(400, {success: false, message: 'tessera non valida'});
        }

        const user = await db.user.findUnique({
            where: {
                cardId_establishmentId: {
                    cardId: data.cardId,
                    establishmentId: locals.currentAdmin.establishmentId
                }
            }
        });

        if(user) {
            return fail(400, {success: false, message: "L'utente esiste già"});
        }

        if(data.phoneNumber && data.phoneNumber !== '') {
            const user = await db.user.findFirst({
                where: {
                    phoneNumber: data.phoneNumber,
                    establishmentId: locals.currentAdmin.establishmentId
                }
            });

            if(user) {
                return fail(400, {success: false, message: 'Numero di telefono già in uso'});
            }
        }

        await db.user.create({
            data: {
                cardId: data.cardId,
                name: data.name || null,
                surname: data.surname || null,
                phoneNumber: data.phoneNumber || null,
                establishmentId: locals.currentAdmin.establishmentId
            }
        });

        return {success: true, message: 'Utente creato con successo' };
    }
}