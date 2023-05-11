import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

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
    (error: AxiosError<AxiosErrorResponse>) => {
      console.log('ERROR INTERCEPTOR:', error);

      /*
      if (error.response?.status === 401) {
        if (error.response?.data?.code?.includes('token')) {
          // renover token
        } else {
          // deslogar usuário

          if (process.browser) {
            destroyCookie(undefined, 'megacarioca.token');

            // Router.reload();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }
      */

      return Promise.reject(error);
    },
  );

  return api;
}
