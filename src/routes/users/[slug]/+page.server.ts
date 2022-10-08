import { db } from '$lib/server/database';
import { redirect, error, invalid } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async({ locals, params }) => {
    if(!locals.currentAdmin) {
        throw redirect(302, '/login');
    }

    const user = await db.user.findFirst({
        where: {
            id: params.slug,
            establishmentId: locals.currentAdmin.establishmentId
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

        const data = await request.formData();
        const amount = parseInt(data.get('amount')?.toString() || '');

        if(isNaN(amount)) {
            return invalid(400, {success: false, message: 'Saldo invalido'});
        }

        try {
            await db.user.updateMany({
                where: {
                    id: params.slug,
                    establishmentId: locals.currentAdmin.establishmentId
                }, data: {
                    balance: {
                        increment: amount
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
            await db.user.deleteMany({
                where: {
                    id: params.slug,
                    establishmentId: locals.currentAdmin.establishmentId
                }
            });
        } catch {
            return invalid(400, {success: false, message: "Errore nella richiesta"});
        }

        throw redirect(302, '/users');
    }
}