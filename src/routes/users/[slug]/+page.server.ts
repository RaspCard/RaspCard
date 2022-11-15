import { redirect, error, invalid } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/database';
import type { BalanceRequest } from '$lib/utils/types';

export const load: PageServerLoad = async({ locals, params }) => {
    if(!locals.currentAdmin) {
        throw redirect(302, '/login');
    }

    const user = await db.user.findFirst({
        where: {
            cardId: params.slug,
            establishmentId: locals.currentAdmin.establishmentId,
            active: true
        },
    });

    if(!user) {
        throw error(404);
    }

    return { user };
}

export const actions: Actions = {
    async balance({locals, params, request}) {
        if(!locals.currentAdmin) {
            return invalid(401);
        }

        const data: BalanceRequest = Object.fromEntries(await request.formData());
        const amount = parseFloat(data?.amount || '');
        const cashback = parseInt(data?.cashback || '0');
        const operationType = data?.operationType === '+' ? 1 : -1;

        if(isNaN(amount) || cashback < 0 || cashback > 100) {
            return invalid(400, {success: false, message: 'Saldo invalido'});
        }

        const user = await db.user.findUnique({
            where: {
                cardId_establishmentId: {
                    cardId: params.slug,
                    establishmentId: locals.currentAdmin.establishmentId
                }
            },
            include: {
                rollback: true
            }
        });

        if(!user) {
            return invalid(404, {success: false, message: 'Utente non trovato'});
        }
        
        console.log(user);

        try {
            await db.user.update({
                where: {
                    cardId_establishmentId: {
                        cardId: params.slug,
                        establishmentId: locals.currentAdmin.establishmentId
                    }
                },
                data: {
                    balance: {
                        increment: operationType === 1 ? amount + (amount/100 * cashback) : amount * operationType
                    }
                }
            });
        } catch {
            return invalid(400, {success: false, message: 'Qualcosa è andato storto nella richiesta'});
        }

        return {success: true, message: `Saldo aggiornato con successo: ${data?.operationType}${amount}€`};
    },

    async rollback({locals, params}) {
        if(!locals.currentAdmin) {
            return invalid(401);
        }

        const currentRollback = await db.user.findUnique({
            where: {
                cardId_establishmentId: {
                    cardId: params.slug,
                    establishmentId: locals.currentAdmin.establishmentId
                }
            },
            include: {
                rollback: true
            }
        });

        if(!currentRollback?.rollback) {
            return invalid(400, {success: false, message: 'Nessun rollback trovato'});
        }

        try {
            await db.user.update({
                where: {
                    cardId_establishmentId: {
                        cardId: params.slug,
                        establishmentId: locals.currentAdmin.establishmentId
                    }
                }, data: {
                    balance: {
                        increment: currentRollback.rollback.balance
                    },
                    func: {
                        set: currentRollback.rollback.func
                    },
                    rollback: {
                        delete: true
                    }
                }
            });
        } catch {
            return invalid(400, {success: false, message: 'Qualcosa è andato storto nella richiesta'});
        }

        return {success: true, message: 'Rollback effettuato con successo'};

    },

    async delete({ locals, params }) {
        if(!locals.currentAdmin) {
            return invalid(401);
        }

        try {
            await db.user.update({
                where: {
                    cardId_establishmentId: {
                        cardId: params.slug,
                        establishmentId: locals.currentAdmin.establishmentId
                    }
                },
                data: {
                    active: false
                }
            });
        } catch {
            return invalid(400, {success: false, message: "Errore nella richiesta"});
        }

        throw redirect(302, '/users');
    },

    async active({ locals, params }) {
        if(!locals.currentAdmin) {
            return invalid(401);
        }

        try {
            await db.user.update({
                where: {
                    cardId_establishmentId: {
                        cardId: params.slug,
                        establishmentId: locals.currentAdmin.establishmentId
                    }
                },
                data: {
                    active: true
                }
            });
        } catch {
            return invalid(400, {success: false, message: "Errore nella richiesta"});
        }

        return {success: true, message: "Utente riattivato con successo"};
    }
}