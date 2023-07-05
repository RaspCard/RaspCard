export interface plugin {
    parseRequest: (request: any) => Promise<any>;
    updateUserBalance: (user: any) => Promise<any>;
    getNavigator: () => navigator;
}

export interface navigator {
    forms: any[];
    position: number;

    getNext: () => any;
    getPrevious: () => any;
}