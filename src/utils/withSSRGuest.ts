import jwt from 'jsonwebtoken';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { parseCookies } from 'nookies';

import { TokenPayload } from '@/types/Auth';

/**
 * Função que garante que uma página pública (login, por exemplo) não pode
 * ser acessada por um usuário JÁ AUTENTICADO, redirecionando-o para Dashboard.
 *
 * Deve ser colocada por volta do GetServerSideProps
 *
 * @param fun
 * @returns
 */
export function withSSRGuest<P>(
  fun: GetServerSideProps<{ [key: string]: any }>,
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<{ [key: string]: any }>> => {
    const cookies = parseCookies(ctx);

    const token = cookies['shalomeventos.token'];
    if (token) {
      const decoded = jwt.decode(token) as TokenPayload;

      let rootRoute = 'participante';
      if (decoded?.role === 'ADMINISTRATOR') rootRoute = 'admin';

      return {
        redirect: {
          destination: `/${rootRoute}/inscricoes`,
          permanent: false,
        },
      };
    }

    return await fun(ctx);
  };
}
