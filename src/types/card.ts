export type ICardData = {
    id: number;
    cardNumber: string;
    cardNumberHidden?: string;
    cardBalance: number;
    initials: string;
    cardCvc: number;
    expiry: string;
    system?: string;
}