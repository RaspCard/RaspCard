export interface DefaultRequest {
    amount: string;
    cashback?: string;
    operationType: '+' | '-';
};

export interface CardRequest {
    cardId: string;
    name?: string;
    surname?: string;
    phoneNumber?: string;
};

export interface EditRequest {
    name: string;
    surname: string;
    phoneNumber: string;
}