export interface Ticket {
  id: string;
  eventId: string;
  title: string;
  price: string;
  startsAt: Date | null;
  expiresAt: string;
  externalPaymentUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
