import { IAddress } from './IAddress';
import { IEvent } from './IEvent';
import { IParticipant } from './IParticipant';
import { IPayment } from './IPayment';

export interface IRegistration {
  user_id: string | null;
  user?: {
    email: string;
    addresses: IAddress[];
  };

  id: string;
  participant_id: string;
  event_id: string;
  credential_name: string;
  event_source: string;
  transportation_mode: string;
  type: string;
  has_participated_previously: boolean;
  accepted_the_terms: boolean;
  is_approved: boolean;
  checked_in: boolean;
  created_at: string;
  updated_at: string;

  participant?: IParticipant;
  payment?: IPayment;
  event?: IEvent;
}
