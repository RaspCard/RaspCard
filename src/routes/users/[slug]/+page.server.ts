import { redirect, error, fail, ActionFailure } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import { getPlugin, getUpdater } from '$lib/plugins/loader';
import { UpdaterFailure } from '$lib/plugins/kit';
import type { PageServerLoad, Actions } from './$types';
import type { EditRequest } from '$lib/utils/types';
import type { User } from '$lib/plugins/types';

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

    async transaction({locals, params, request}) {
        if(!locals.currentAdmin) {
            return fail(401);
        }

        const mod = await getPlugin(locals.currentAdmin.establishmentName);

        const rawData = await request.formData();
        if (!rawData.has('plugin')) {
            return fail(400, {success: false, message: 'Errore nel caricamento del plugin'});
        }
        const plugin = rawData.get('plugin')?.toString();
        if (!plugin) {
            return fail(400, {success: false, message: 'Errore nel caricamento del plugin'});
        }

        let regex = /Proxy<(\w+)>/;
        let m = plugin.match(regex);
        if (m === null) {
            return fail(400, {success: false, message: 'Errore nel caricamento del plugin'});
        }
        const pluginType = m[1].toLowerCase();
        rawData.delete('plugin');

        let user = await db.user.findUnique({
            where: {
                cardId_establishmentId: {
                    cardId: params.slug,
                    establishmentId: locals.currentAdmin.establishmentId
                }
            }
        }) as User;

        if(!user) {
            return fail(404, {success: false, message: 'Utente non trovato'});
        }
        
        let updatedUser: User | UpdaterFailure;

        let updater = await getUpdater(pluginType, mod);

        if (updater instanceof UpdaterFailure) {
            return fail(500, {success: updater.success, message: updater.message});
        }

        updatedUser = await updater(user, rawData);

        if (updatedUser instanceof UpdaterFailure) {
            return fail(400, {success: updatedUser.success, message: updatedUser.message});
        }

        if (!updatedUser) {
            return fail(400, {success: false, message: 'Qualcosa è andato storto nella richiesta'});
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
                    balance: {
                        set: updatedUser.balance
                    },
                    func: {
                        set: updatedUser.func
                    },
                    rollback: {
                        create: {
                            transaction: (updatedUser.balance - user.balance),
                            func: user.func
                        }
                    }
                }
            });
        } catch (e) {
            return fail(400, {success: false, message: 'Qualcosa è andato storto nella richiesta'});
        }

        return {success: true, message: `Utente aggiornato con successo`};
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