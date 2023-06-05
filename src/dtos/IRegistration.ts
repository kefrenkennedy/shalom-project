import { IEvent } from './IEvent';
import { IParticipant } from './IParticipant';
import { IPayment } from './IPayment';

export interface IRegistration {
  id: string;
  user_id: string;
  event_id: string;
  credential_name: string;
  event_source?: string;
  transportation_mode: string;
  accepted_the_terms: boolean;
  is_approved: boolean;
  event?: IEvent;
  payment?: IPayment;
  type: string;
  has_participated_previously: boolean;
  user?: {
    email: string;
    participant: IParticipant;
  };
}
