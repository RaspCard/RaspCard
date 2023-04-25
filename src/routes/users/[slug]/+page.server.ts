import { redirect, error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/database';
import type { BalanceRequest, EditRequest } from '$lib/utils/types';

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
        include: {
            rollback: {
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });

    if(!user) {
        throw error(404);
    }

    return { user };
}

export const actions: Actions = {
    async edit({ locals, params, request}) {
        if(!locals.currentAdmin) {
            throw redirect(302, '/login');
        }

        const data = Object.fromEntries(await request.formData()) as unknown as EditRequest;

        try {
            await db.user.update({
                where: {
                    cardId_establishmentId: {
                        cardId: params.slug,
                        establishmentId: locals.currentAdmin.establishmentId
                    }
                },
                data: {
                    name: data.name,
                    surname: data.surname,
                    phoneNumber: data.phoneNumber,
                }
            });
        } catch {
            return fail(400, {success: false, message: 'Qualcosa è andato storto nella richiesta'});
        }

        return {success: true, message: "Dati aggiornati con successo"}; 
    },

    async balance({locals, params, request}) {
        if(!locals.currentAdmin) {
            return fail(401);
        }

        const data = Object.fromEntries(await request.formData()) as unknown as BalanceRequest;
        const amount = parseFloat(data.amount || '');
        const cashback = parseInt(data?.cashback || '0');
        const operationType = data.operationType === '+' ? 1 : -1;

        if(isNaN(amount) || cashback < 0 || cashback > 100) {
            return fail(400, {success: false, message: 'Saldo invalido'});
        }

        const user = await db.user.findUnique({
            where: {
                cardId_establishmentId: {
                    cardId: params.slug,
                    establishmentId: locals.currentAdmin.establishmentId
                }
            }
        });

        if(!user) {
            return fail(404, {success: false, message: 'Utente non trovato'});
        }

        const calculedValue = operationType === 1 ? amount + (amount/100 * cashback) : amount * operationType;

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
                        increment: calculedValue
                    },
                    rollback: {
                        create: {
                            transaction: calculedValue,
                            func: user.func
                        }
                    }
                }
            });
        } catch (e) {
            return fail(400, {success: false, message: 'Qualcosa è andato storto nella richiesta'});
        }

        return {success: true, message: `Saldo aggiornato con successo: ${data.operationType}${amount}€`};
    },

    async rollback({locals, params}) {
        if(!locals.currentAdmin) {
            return fail(401);
        }

        const currentUserData = await db.user.findUnique({
            where: {
                cardId_establishmentId: {
                    cardId: params.slug,
                    establishmentId: locals.currentAdmin.establishmentId
                }
            },
            include: {
                rollback: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                }
            }
        });

        if(!currentUserData || currentUserData.rollback.length === 0) {
            return fail(400, {success: false, message: 'Nessun rollback trovato'});
        }

        const newBalance = currentUserData.balance + (currentUserData.rollback[0].transaction * -1);

        try {
            await db.user.update({
                where: {
                    cardId_establishmentId: {
                        cardId: params.slug,
                        establishmentId: locals.currentAdmin.establishmentId
                    }
                }, data: {
                    balance: {
                        set: newBalance
                    },
                    func: {
                        set: currentUserData.rollback[0].func
                    },
                    rollback: {
                        delete: {
                            id: currentUserData.rollback[0].id
                        }
                    }
                }
            });
        } catch {
            return fail(400, {success: false, message: 'Qualcosa è andato storto nella richiesta'});
        }

        return {success: true, message: 'Rollback effettuato con successo'};
    },

    async delete({ locals, params }) {
        if(!locals.currentAdmin) {
            return fail(401);
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
            return fail(400, {success: false, message: "Errore nella richiesta"});
        }

        throw redirect(302, '/users');
    },

    async active({ locals, params }) {
        if(!locals.currentAdmin) {
            return fail(401);
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
            return fail(400, {success: false, message: "Errore nella richiesta"});
        }

        return {success: true, message: "Utente riattivato con successo"};
    }
}