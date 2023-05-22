import { api } from './apiClient';

const PATH = '/addresses/participant';

interface ICreateRequest {
  street: string;
  street_number: string;
  complement?: string;
  zip_code: string;
  district: string;
  city: string;
  state: string;
}

export const participantAddressesServices = () => ({
  create: async (data: ICreateRequest) => {
    const response = await api.post(PATH, data);
    return response.data;
  },
  list: async () => {
    const response = await api.get(PATH);
    return response.data;
  },
  update: async (id: string, data: Partial<ICreateRequest>) => {
    const response = await api.put(`/addresses/${id}/participant`, data);
    return response.data;
  },
});
