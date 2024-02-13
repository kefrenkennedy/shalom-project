import { api } from './apiClient';

const PATH = '/payments';

export const adminPaymentsServices = () => ({
  update: async (paymentId: string) => {
    const response = await api.patch(PATH + `/${paymentId}/update-status`);
    return response.data;
  },
});
