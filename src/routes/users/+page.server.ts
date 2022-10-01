import { db } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async({ locals }) => {
    if(!locals.currentAdmin) {
        throw redirect(302, '/login');
    }

    const users = await db.user.findMany({
        where: { establishmentId: locals.currentAdmin.establishmentId },
    });

    return { users };
}