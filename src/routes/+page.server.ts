import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';


export const load: PageServerLoad = async({ locals }) => {
    if(!locals.currentAdmin) {
        throw redirect(302, '/login');
    }

    const activeUsers = await db.user.count({
        where: {
            establishmentId: locals.currentAdmin.establishmentId,
            active: true
        }
    });

    const inactiveUsers = await db.user.count({
        where: {
            establishmentId: locals.currentAdmin.establishmentId,
            active: false
        }
    });

    const latestTransactions = await db.rollback.findMany({
        where: {
            user: {
                establishmentId: locals.currentAdmin.establishmentId
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            user: true
        },
        take: 50
    });

    return {
        activeUsersCount: activeUsers,
        inactiveUsersCount: inactiveUsers,
        latestTransactions
    };
}