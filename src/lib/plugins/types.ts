export interface RaspcardPlugin {
    parseRequest: (request: any) => Promise<any>;
    updateUserBalance: (user: any) => Promise<any>;
    populateForm: () => Promise<any>;
}