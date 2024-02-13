import { Address } from './Address';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  addresses?: Address[];
}
