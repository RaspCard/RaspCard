import { db } from "$lib/server/database";
import * as cookie from "cookie";
import type { LayoutServerLoad } from './$types';


export const load: LayoutServerLoad = async({ request }) => {
    const cookies = cookie.parse(request.headers.get('cookie') || '');

    if(!cookies.session) {
        return {
            currentUser: null
        };
    }

    const user = await db.user.findUnique({ where: { id: cookies.session } });

    return { currentUser: user };
}