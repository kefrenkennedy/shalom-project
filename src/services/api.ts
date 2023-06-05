import axios, { AxiosError } from 'axios';
import { destroyCookie, parseCookies } from 'nookies';

import { AuthTokenError } from './errors/AuthTokenError';

interface AxiosErrorResponse {
  status?: number;
  code?: string;
}

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    headers: {
      Authorization: `Bearer ${cookies['shalomeventos.token']}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError<AxiosErrorResponse>) => {
      if (error.response?.status === 401) {
        // window.alert(JSON.stringify(error.response.data?.message, null, 2));
        // console.log(JSON.stringify(error.response, null, 2));
        if (error.response?.data?.code?.includes('token')) {
          // renover token
          console.log('ENTROU NO IF');

          // const response = await axios.patch('/token/refresh');
          // console.log(response.data);
        } else {
          console.log('ENTROU NO ELSE');
          // deslogar usuário

          if (process.browser) {
            // destroyCookie(undefined, 'shalomeventos.token', { path: '/' });
            // Router.reload();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
}
