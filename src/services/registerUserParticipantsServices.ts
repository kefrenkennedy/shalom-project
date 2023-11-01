import { api } from './apiClient';

const PATH = '/participants/register';

export const registerUserParticipantsServices = () => ({
  create: async (data: FormData) => {
    const response = await api.post(PATH, data);
    return response.data;
  },
});
