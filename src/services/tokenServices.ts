import { api } from './apiClient';

const PATH = '/token';

export const tokenServices = () => ({
  update: async () => {
    const response = await api.patch(PATH + '/refresh');
    return response.data;
  },
});
