import { ICreateRegistrationDTO } from '@/dtos/ICreateRegistrationDTO';

import { api } from './apiClient';

const PATH = '/registrations';

interface IRequest extends ICreateRegistrationDTO {}

export const registrationsService = () => ({
  create: async (event_id: string, data: IRequest) => {
    const response = await api.post(PATH + `/event/${event_id}`, data);
    return response.data;
  },
});
