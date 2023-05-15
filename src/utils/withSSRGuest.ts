import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { parseCookies } from 'nookies';

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

    if (cookies['shalomeventos.token']) {
      return {
        redirect: {
          destination: '/participante/inscricoes',
          permanent: false,
        },
      };
    }

    return await fun(ctx);
  };
}
