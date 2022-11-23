import { invalid, redirect } from '@sveltejs/kit';
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
            return invalid(401);
        }

        const data: CardRequest = Object.fromEntries(await request.formData());

        if(!data.cardId || typeof(data.cardId) !== 'string') {
            return invalid(400);
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
            return invalid(400, {success: false, message: "L'utente esiste già"});
        }

        const parsedDeposit = parseFloat(data.amount || '');

        if(data.phoneNumber && data.phoneNumber !== '') {
            const user = await db.user.findFirst({
                where: {
                    phoneNumber: data.phoneNumber,
                    establishmentId: locals.currentAdmin.establishmentId
                }
            });

            if(user) {
                return invalid(400, {success: false, message: 'Numero di telefono già in uso'});
            }
        }

        await db.user.create({
            data: {
                cardId: data.cardId,
                name: data.name || null,
                surname: data.surname || null,
                phoneNumber: data.phoneNumber || null,
                balance: isNaN(parsedDeposit) ? 0 : parsedDeposit,
                establishmentId: locals.currentAdmin.establishmentId,
                rollback: {
                    create: {}
                }
            }
        });

        return {success: true, message: 'Utente creato con successo' };
    }
}