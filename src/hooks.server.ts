import type { Handle } from "@sveltejs/kit";
import { db }from '$lib/server/database';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	// find the user based on the session
	const user = await db.admin.findUnique({
		where: { id: session },
        include: { establishment: true }
	});

	if(user) {
		event.locals.currentAdmin = {
			id: user.id,
            name: user.name,
            establishmentId: user.establishmentId,
            establishmentName: user.establishment.name
		};
	}

	return await resolve(event);
}