import { db } from '$lib/server/database';
import { invalid, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';


export const load: PageServerLoad = async({ locals }) => {
    if(!locals.currentAdmin) {
        throw redirect(302, '/login');
    }
}


export const actions: Actions = {
    async default({request, locals}) {
        if(!locals.currentAdmin) {
            return invalid(401);
        }

        const data = Object.fromEntries(await request.formData());
        return {};
        const parsedPhoneNumber = parseInt(data.get('phoneNumber')?.toString() || '');
        // const parsedMigrationID = parseInt(data.get('migrationID')?.toString() || '');
        const parsedDeposit = parseInt(data.get('deposit')?.toString() || '');

        if(!isNaN(parsedPhoneNumber)) {
            const user = await db.user.findFirst({
                where: {
                    phoneNumber: parsedPhoneNumber
                }
            });

            if(user) {
                return invalid(400, {success: false, message: 'Numero di telefono già in uso'});
            }
        }
    
    
        await db.user.create({
            data: {
                name: data.get('name')?.toString() || null,
                surname: data.get('surname')?.toString() || null,
                phoneNumber: isNaN(parsedPhoneNumber) ? null : parsedPhoneNumber,
                balance: isNaN(parsedDeposit) ? 0 : parsedDeposit,
                establishmentId: locals.currentAdmin.establishmentId
            }
        });
    
        return {success: true, message: 'Utente creato con successo' };
    }
}