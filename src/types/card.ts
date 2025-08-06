export type ICardData = {
    id: number;
    cardNumber: string;
    cardNumberHidden?: string;
    cardBalance: number;
    initials: string;
    cardCvc: number;
    expiry: string;
    system?: string;
    created_at: Date;
    updated_at: Date;
}