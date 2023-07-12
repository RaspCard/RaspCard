import type { UpdaterFailure, Navigator } from "./kit";

export interface Plugin {
    updaters: Updaters;
    createPluginStorage: () => string | null;
    getNavigator: () => Navigator;
}

export type Updaters = {
    [key: string]: (user: User, request: FormData) => Promise<User | UpdaterFailure>;
};

export interface User {
    id: number;
    cardId: string;
    name: string;
    surname: string;
    phoneNumber: string;

    balance: number;
    active: boolean;
    func: string;
}
