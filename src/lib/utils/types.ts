export interface BalanceRequest {
    amount?: string;
    cashback?: string;
    operationType?: '+' | '-';
};

export interface CardRequest {
    cardId?: string;
    amount?: string;
    name?: string;
    surname?: string;
    phoneNumber?: string;
};