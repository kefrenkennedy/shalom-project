import { ICreateRegistrationDTO } from '@/dtos/ICreateRegistrationDTO';

import { api } from './apiClient';

const PATH = '/registrations';

export const adminRegistrationsService = () => ({
  update: async (id: string) => {
    const response = await api.patch(PATH + `/${id}/confirm`);
    return response.data;
  },
  list: async (event_id: string) => {
    const response = await api.post(PATH + `/event/${event_id}`);
    return response.data;
  },
});
