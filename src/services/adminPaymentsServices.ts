import { api } from './apiClient';

const PATH = '/payments';

export const adminPaymentsServices = () => ({
  update: async (payment_id: string) => {
    const response = await api.patch(PATH + `/${payment_id}/update-status`);
    return response.data;
  },
});
