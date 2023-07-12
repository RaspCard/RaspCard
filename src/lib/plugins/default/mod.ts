import { UpdaterFailure } from "../kit";
import type { User, Updaters } from "../types";
import type { DefaultRequest } from "$lib/utils/types";

export function getNavigator() {
    return new Navigator();
}

export const updaters: Updaters = {
    async defaultUpdater(user: User, request: FormData): Promise<User | UpdaterFailure> {
        user = {...user};
        const data = Object.fromEntries(request) as unknown as DefaultRequest;
        const amount = parseFloat(data.amount || '');
        const cashback = parseInt(data?.cashback || '0');
        const operationType = data.operationType === '+' ? 1 : -1;
    
        if(isNaN(amount) || cashback < 0 || cashback > 100) {
            return new UpdaterFailure(false, 'Dati non validi');
        }
    
        const calculedValue = operationType === 1 ? amount + (amount/100 * cashback) : amount * operationType;
        
        user.balance += calculedValue;
    
        return user;
    } 
}
