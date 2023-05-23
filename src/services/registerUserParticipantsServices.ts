import { api } from './apiClient';

const PATH = '/participants/register';

interface ICreateRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;

  street: string;
  street_number: string;
  complement?: string;
  zip_code: string;
  district: string;
  city: string;
  state: string;

  full_name: string;
  phone_number: string;
  birthdate: Date;
  document_number: string;
  document_type: string;
  guardian_name?: string;
  guardian_phone_number?: string;
  prayer_group?: string;
  community_type?: string;
  pcd_description?: string;
  allergy_description?: string;
}

export const registerUserParticipantsServices = () => ({
  create: async (data: ICreateRequest) => {
    const response = await api.post(PATH, data);
    return response.data;
  },
});
