import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async({ locals }) => {
    if(!locals.currentAdmin) {
        throw redirect(302, '/login');
    }

    const users = await db.user.findMany({
        where: { establishmentId: locals.currentAdmin.establishmentId, active: true }
    });

    return { users };
}