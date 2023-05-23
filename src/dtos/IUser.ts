import { IParticipant } from './IParticipant';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMINISTRATOR' | 'PARTICIPANT';
  participant?: IParticipant;
}
