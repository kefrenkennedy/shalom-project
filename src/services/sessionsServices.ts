import { ICreateUserDTO, ISignInDTO } from '@/dtos';
import { api } from './apiClient';
import { IUser } from '@/hooks/auth';

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
