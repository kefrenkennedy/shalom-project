import { Address } from './Address';
import { Event } from './Event';
import { Participant } from './Participant';
import { Payment } from './Payment';

export interface Registration {
  userId: string | null;
  user?: {
    email: string;
    addresses: Address[];
  };

  id: string;
  participantId: string;
  eventId: string;
  credentialName: string;
  eventSource: string;
  transportationMode: string;
  type: string;
  hasParticipatedPreviously: boolean;
  acceptedTheTerms: boolean;
  isApproved: boolean;
  checkedIn: boolean;
  createdAt: string;
  updatedAt: string;

  participant?: Participant;
  payment?: Payment;
  event?: Event;
}

export interface CreateRegistration {
  credentialName: string;
  eventSource?: string;
  transportationMode: string;
  acceptedTheTerms: boolean;
  type: string;
  hasParticipatedPreviously: boolean;
}

export interface RegistrationFilter {
  eventId: string;
  type?: string;
}
