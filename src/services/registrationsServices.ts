import { api } from './apiClient';
import { ICreateRegistrationDTO } from '@/dtos/ICreateRegistrationDTO';

const PATH = '/registrations';

interface IRequest extends ICreateRegistrationDTO {}

export const registrationsService = () => ({
  create: async (event_id: string, data: IRequest) => {
    const response = await api.post(PATH + `/event/${event_id}`, data);
    return response.data;
  },
});
