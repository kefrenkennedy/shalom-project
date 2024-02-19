import { api } from './apiClient';

const PATH = '/tickets';

interface ListRequest {
  eventId: string;
}

interface CreateRequest {}

interface UpdateRequest {}

export const ticketsServices = () => ({
  create: async (data: CreateRequest) => {
    const response = await api.post(PATH, data);
    return response.data;
  },
  list: async ({ eventId }: ListRequest) => {
    const response = await api.get(PATH, { params: { eventId } });
    return response.data;
  },
  update: async (id: string, data: UpdateRequest) => {
    const response = await api.put(`${PATH}/${id}`, data);
    return response.data;
  },
});
