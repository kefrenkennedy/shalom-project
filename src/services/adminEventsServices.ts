import { api } from './apiClient';

const PATH = '/events';

interface ICreateRequest {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
}

export const adminEventsServices = () => ({
  create: async (data: ICreateRequest) => {
    const response = await api.post(PATH, data);
    return response.data;
  },
});