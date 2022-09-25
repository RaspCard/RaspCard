import { db } from '$lib/server/database';
import type { Admin } from '@prisma/client';
import * as cookie from 'cookie';

export async function checkSession(rawCookies: string): Promise<Admin | null> {
    const cookies = cookie.parse(rawCookies);
    const session = cookies.session;

    if (!session) {
        return null;
    } 

    const currentAdmin = await db.admin.findUnique({ where: { id: session } });

    if (!currentAdmin) {
        return null;
    }

    return currentAdmin;
}