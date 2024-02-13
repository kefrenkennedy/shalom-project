import { RegistrationFilter } from '@/types/Registration';

import { api } from './apiClient';

const PATH = '/registrations';

interface ListRequest extends RegistrationFilter {}

export const adminRegistrationsService = () => ({
  update: async (id: string) => {
    const response = await api.patch(PATH + `/${id}/approve`);
    return response.data;
  },
  list: async ({ eventId, type }: ListRequest) => {
    const response = await api.get(PATH, { params: { eventId, type } });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(PATH + `/${id}`);
    return response.data;
  },
});
