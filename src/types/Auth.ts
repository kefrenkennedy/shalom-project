import { Participant } from './Participant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMINISTRATOR' | 'PARTICIPANT';
  participant?: Participant;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface TokenPayload {
  role: 'ADMINISTRATOR' | 'PARTICIPANT';
  sub: string;
  exp: number;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
