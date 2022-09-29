import { db } from '$lib/server/database';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({parent, params}) => {
    const { currentAdmin } = await parent();

    if (!currentAdmin) {
        throw redirect(307, '/login');
    }

    const user = await db.user.findFirst({
        where: {
            id: params.slug,
            establishmentId: currentAdmin.establishmentId,
        }
    });

    if(!user) {
        throw error(404);
    }

    return {
        user
    };
}