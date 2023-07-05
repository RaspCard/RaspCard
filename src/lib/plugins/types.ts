export interface plugin {
    parseRequest: (request: any) => Promise<any>;
    updateUserBalance: (user: any) => Promise<any>;
    getNavigator: () => navigator;
}