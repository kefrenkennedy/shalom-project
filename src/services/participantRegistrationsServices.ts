import { ICreateRegistrationDTO } from '@/dtos/ICreateRegistrationDTO';
import { IRegistration } from '@/dtos/IRegistration';

import { api } from './apiClient';

const PATH = '/registrations';

interface IRequest extends ICreateRegistrationDTO {}

interface IListResponse {
  registrations: IRegistration[];
}

export const participantRegistrationsService = () => ({
  create: async (event_id: string, data: IRequest) => {
    const response = await api.post(PATH + `/event/${event_id}`, data);
    return response.data;
  },
  list: async () => {
    const response = await api.get<IListResponse>(PATH + `/my`);
    return response.data;
  },
});
