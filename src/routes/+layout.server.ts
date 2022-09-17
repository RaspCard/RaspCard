import { db } from "$lib/database";
import * as cookie from "cookie";
import type { LayoutServerLoad } from './$types';


export const load: LayoutServerLoad = async({ request }) => {
    const cookies = cookie.parse(request.headers.get('cookie') || '');

    if(!cookies.session) {
        return {
            currentUser: null
        };
    }

    const user = cookies.session ? await db.user.findUnique({ where: { id: cookies.session } }) : null;

    return { currentUser: user };
}