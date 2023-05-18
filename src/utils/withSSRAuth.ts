import jwt from 'jsonwebtoken';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';

import { ITokenPayload } from '@/dtos/ITokenPayload';
import { AuthTokenError } from '@/services/errors/AuthTokenError';

/**
 * Função que garante que uma página privada (como a Dashboard) não pode
 * ser acessada por um usuário que não está logado, redirecionando-o para Login.
 *
 * Deve ser colocada por volta do GetServerSideProps
 *
 * @param fun
 * @returns
 */
export function withSSRAuth<P>(
  fun: GetServerSideProps<{ [key: string]: any }>,
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<{ [key: string]: any }>> => {
    const cookies = parseCookies(ctx);

    const token = cookies['shalomeventos.token'];
    if (!token) {
      return {
        redirect: {
          destination: '/participante/sign-in',
          permanent: false,
        },
      };
    }

    const decoded = jwt.decode(token) as ITokenPayload;

    let rootRoute = 'participante';
    if (decoded?.role === 'ADMINISTRATOR') rootRoute = 'admin';

    const rootRouteFromCrx = ctx.resolvedUrl.split('/')[1];
    if (rootRouteFromCrx !== rootRoute) {
      return {
        redirect: {
          destination: `${ctx.resolvedUrl.replace(
            rootRouteFromCrx,
            rootRoute,
          )}`,
          permanent: false,
        },
      };
    }

    try {
      return await fun(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'shalomeventos.token', {
          path: '/',
        });
      }

      return {
        redirect: {
          destination: '/',
          permanent: true,
        },
      };
    }
  };
}
