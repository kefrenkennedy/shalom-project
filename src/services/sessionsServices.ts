import { ISignInDTO } from '@/dtos';
import { IUser } from '@/dtos/IUser';

import { api } from './apiClient';

const PATH = '/sessions';

interface IRequest extends ISignInDTO {}

interface IResponse {
  token: string;
  user: IUser;
}

export const sessionsServices = () => ({
  create: async (data: IRequest) => {
    const response = await api.post<IResponse>(PATH, data);
    return response.data;
  },
});
