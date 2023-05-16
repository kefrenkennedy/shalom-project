export interface IPayment {
  id: string;
  event_registration_id: string;
  event_ticket_id: string;
  payment_method: string;
  price: string;
  file: string;
  status: string;
}
