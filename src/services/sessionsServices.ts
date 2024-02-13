import { SignIn, User } from '@/types/Auth';

import { api } from './apiClient';

const PATH = '/sessions';

interface Request extends SignIn {}

interface IResponse {
  token: string;
  user: User;
}

export const sessionsServices = () => ({
  create: async (data: Request) => {
    const response = await api.post<IResponse>(PATH, data);
    return response.data;
  },
});
