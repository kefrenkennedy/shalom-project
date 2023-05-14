import { ICreateRegistrationDTO } from '@/dtos/ICreateRegistrationDTO';
import { IRegistration } from '@/dtos/IRegistration';

import { api } from './apiClient';

const PATH = '/payments';

interface IRequest extends FormData {}

export const participantPaymentsServices = () => ({
  create: async (registration_id: string, data: IRequest) => {
    const response = await api.post(
      PATH + `/registration/${registration_id}`,
      data,
    );
    return response.data;
  },
});
