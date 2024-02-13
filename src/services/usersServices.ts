import { CreateUser } from '@/types/Auth';

import { api } from './apiClient';

const PATH = '/users';

interface IRequest extends CreateUser {}

export const usersService = () => ({
  create: async (data: IRequest) => {
    const response = await api.post(PATH, data);
    return response.data;
  },
});
