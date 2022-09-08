import { db } from "$lib/database";
import type { LayoutServerLoad } from './$types';


export const load: LayoutServerLoad = async({ request }) => {
    const cookies = request.headers.get('cookie');
    const session = cookies?.split('; ').find(row => row.startsWith('session='))?.split('=')[1];

    const user = session ? await db.user.findUnique({ where: { id: session } }) : null;

    return { user };
}