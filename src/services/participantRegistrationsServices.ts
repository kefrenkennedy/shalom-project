import { CreateRegistration } from '@/types/Registration';
import { Registration } from '@/types/Registration';

import { api } from './apiClient';

const PATH = '/registrations';

interface Request extends CreateRegistration {}

interface ListResponse {
  registrations: Registration[];
}

export const participantRegistrationsService = () => ({
  create: async (eventId: string, data: Request) => {
    const response = await api.post(PATH + `/event/${eventId}`, data);
    return response.data;
  },
  list: async () => {
    const response = await api.get<ListResponse>(PATH + `/my`);
    return response.data;
  },
});
