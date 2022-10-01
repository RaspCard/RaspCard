import { db } from '$lib/server/database';
import { invalid, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';


export const actions: Actions = {
	async default({ request, cookies }) {
        const data = await request.formData();

        const user = await db.admin.findUnique({
            where: { id: data.get('uuid')?.toString() }
        });

        if(!user) {
            return invalid(400, {success: false, message: 'Invalid user'});
        }

		cookies.set('session', user.id, {
			path: '/',
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7
		});

		throw redirect(302, '/dashboard');
	}
}