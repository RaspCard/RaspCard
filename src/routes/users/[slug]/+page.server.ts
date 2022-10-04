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
    async balance({locals, params}) {
        if(!locals.currentAdmin) {
            return invalid(401);
        }
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
        
        throw redirect(302, '/dashboard');
    }
}