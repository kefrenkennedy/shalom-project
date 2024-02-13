import { Address } from './Address';
import { User } from './Auth';

export interface Participant {
  id: string;
  userId?: string | null;
  fullName: string;
  phoneNumber: string;
  birthdate: Date;
  documentNumber: string;
  documentType: string;
  guardianName?: string;
  guardianPhoneNumber?: string;
  prayerGroup?: string;
  community_type?: string;
  pcdDescription?: string;
  allergyDescription?: string;
  medicationUseDescription?: string;
  createdAt?: Date;
  email: string;

  addresses?: Address[];
  user?: User;
}
