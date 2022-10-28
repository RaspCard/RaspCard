import { redirect, error, invalid } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/database';
import type { BalanceRequest } from '$lib/utils/types';

export const load: PageServerLoad = async({ locals, params }) => {
    if(!locals.currentAdmin) {
        throw redirect(302, '/login');
    }

    const user = await db.user.findFirst({
        where: {
            cardId: params.slug,
            establishmentId: locals.currentAdmin.establishmentId,
            active: true
        },
    });

    if(!user) {
        throw error(404);
    }

    return { user };
}

export const actions: Actions = {
    async balance({locals, params, request}) {
        if(!locals.currentAdmin) {
            return invalid(401);
        }

        const data: BalanceRequest = Object.fromEntries(await request.formData());
        const amount = parseFloat(data?.amount || '');
        const operationType = data?.operationType === '+' ? 1 : -1;

        if(isNaN(amount)) {
            return invalid(400, {success: false, message: 'Saldo invalido'});
        }

        try {
            await db.user.update({
                where: {
                    cardId_establishmentId: {
                        cardId: params.slug,
                        establishmentId: locals.currentAdmin.establishmentId
                    }
                }, data: {
                    balance: {
                        increment: amount * operationType
                    }
                }
            });
        } catch {
            return invalid(400, {success: false, message: 'Qualcosa è andato storto nella richiesta'});
        }

        return {success: true, message: '', balance: amount};
    },

    async rollback({locals, params}) {
        if(!locals.currentAdmin) {
            return invalid(401);
        }

    },

    async delete({ locals, params }) {
        if(!locals.currentAdmin) {
            return invalid(401);
        }

        try {
            await db.user.update({
                where: {
                    cardId_establishmentId: {
                        cardId: params.slug,
                        establishmentId: locals.currentAdmin.establishmentId
                    }
                },
                data: {
                    active: false
                }
            });
        } catch {
            return invalid(400, {success: false, message: "Errore nella richiesta"});
        }

        throw redirect(302, '/users');
    }
}