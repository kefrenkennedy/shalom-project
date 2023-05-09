import { ICreateUserDTO } from '@/dtos/ICreateUserDTO';
import { api } from './apiClient';

const PATH = '/users';

interface IRequest extends ICreateUserDTO {}

export const usersService = () => ({
  create: async (data: IRequest) => {
    const response = await api.post(PATH, data);
    return response.data;
  },
});
