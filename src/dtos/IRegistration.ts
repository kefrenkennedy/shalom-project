import { IEvent } from './IEvent';
import { IPayment } from './IPayment';

export interface IRegistration {
  id: string;
  user_id: string;
  event_id: string;
  full_name: string;
  phone_number: string;
  age: number;
  document_number: string;
  document_type: string;
  guardian_name?: string;
  guardian_phone_number?: string;
  prayer_group?: string;
  event_source?: string;
  community_type?: string;
  pcd_description?: string;
  allergy_description?: string;
  transportation_mode: string;
  accepted_the_terms: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  event?: IEvent;
  payment?: IPayment;
}
