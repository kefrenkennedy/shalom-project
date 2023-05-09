import { api } from './apiClient';

const PATH = '/events';

export const eventsServices = () => ({
  list: async () => {
    const response = await api.get(PATH);
    return response.data;
  },
  show: async (id: string) => {
    const response = await api.get(`${PATH}/${id}`);
    return response.data;
  },
});
