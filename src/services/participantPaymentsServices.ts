import { api } from './apiClient';

const PATH = '/payments';

interface Request extends FormData {}

export const participantPaymentsServices = () => ({
  create: async (registrationId: string, data: Request) => {
    const response = await api.post(
      PATH + `/registration/${registrationId}`,
      data,
    );
    return response.data;
  },
});
