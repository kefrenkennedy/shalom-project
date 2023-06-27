import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import { useAuth } from '@/hooks/auth';
import { withSSRGuest } from '@/utils/withSSRGuest';

import { Input } from '../../../components/forms/atomics/Input';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const { user, signIn, signOut } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    const { email, password } = data;
    try {
      await signIn({ email, password });
    } catch (err) {
      toast.warn('Credenciais inválidas');
    }
    return;
  };

  useEffect(() => {
    if (user.id) {
      if (user.role !== 'PARTICIPANT') {
        signOut();
        toast.warn('Você não é um usuário participante');
      } else {
        router.push('/participante/inscricoes');
      }
    }
  }, [user, router, signOut]);

  return (
    <Flex bg="gray.50" w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="white"
        p="8"
        borderRadius={20}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Text fontWeight="bolder" align="center">
            Portal do Participante
          </Text>

          <Input
            type="email"
            label="E-mail"
            borderColor="gray.200"
            bg="white"
            {...register('email')}
            error={errors.email}
          />
          <Input
            type="password"
            label="Senha"
            {...register('password')}
            borderColor="gray.200"
            bg="white"
            error={errors.password}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          bg="green.200"
          borderRadius="full"
          colorScheme="green"
          color="white"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

// export const getServerSideProps = withSSRGuest(async (ctx) => {
//   return {
//     props: {},
//   };
// });
