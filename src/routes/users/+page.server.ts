import { db } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({parent}) => {
    const { currentAdmin } = await parent();

    if (!currentAdmin) {
        throw redirect(307, '/login');
    }

    const users = await db.user.findMany({
        where: {
            establishmentId: currentAdmin.establishmentId
        }
    });

    return {
        users
    };
}