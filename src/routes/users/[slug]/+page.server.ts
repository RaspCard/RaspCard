import { db } from '$lib/server/database';
import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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