export interface Payment {
  id: string;
  eventRegistrationId: string;
  eventTicketId: string;
  paymentMethod: string;
  price: string;
  file: string;
  status: string;
}
