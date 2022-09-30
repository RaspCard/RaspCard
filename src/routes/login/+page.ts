import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({parent}) => {
    const { currentAdmin } = await parent();

    if (currentAdmin) {
        throw redirect(307, '/dashboard');
    }
    
    return { };
}