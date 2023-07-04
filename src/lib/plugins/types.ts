export interface Plugin {
    parseRequest: (request: any) => Promise<any>;
    updateUserBalance: (user: any) => Promise<any>;
    populateForm: () => any;
}