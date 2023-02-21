import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/database';


export const load: PageServerLoad = async({ locals }) => {
    if(locals.currentAdmin) {
        throw redirect(302, '/');
    }
}


export const actions: Actions = {
	async default({ request, cookies }) {
        const data = await request.formData();

        const user = await db.admin.findUnique({
            where: { id: data.get('uuid')?.toString() }
        });

        if(!user) {
            return fail(400, {success: false, message: 'Invalid user'});
        }

        if (user.pin !== parseInt(data.get('password')?.toString() ?? '')) { // temporary
            return fail(400, {success: false, message: 'Invalid pin'});
        }

		cookies.set('session', user.id, {
			path: '/',
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7
		});

		throw redirect(302, '/');
	}
}