import { api } from './apiClient';

const PATH = '/payments';

interface IRequest extends FormData {}

export const participantPaymentsServices = () => ({
  create: async (registrationId: string, data: IRequest) => {
    const response = await api.post(
      PATH + `/registration/${registrationId}`,
      data,
    );
    return response.data;
  },
});
