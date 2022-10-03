import { db } from '$lib/server/database';
import { invalid } from '@sveltejs/kit';
import type { Actions } from './$types';


export const actions: Actions = {
    async default({request, locals}) {
        if(!locals.currentAdmin) {
            return invalid(401);
        }

        const data = await request.formData();

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
                establishmentId: 1
            }
        });
    
        return {success: true, message: 'Utente creato con successo' };
    }
}