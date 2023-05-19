import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Box,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { z } from 'zod';

import { Input } from '@/components/forms/atomics/Input';

type AddressFormData = {
  street: string;
  street_number: string;
  complement: string;
  zip_code: string;
  district: string;
  city: string;
  state: string;
};

const FormSchema = z.object({
  street: z.string().nonempty('Rua obrigatória'),
  street_number: z.string().nonempty('Número da rua obrigatória'),
  complement: z.string(),
  zip_code: z
    .string()
    .regex(/^\d{5}-\d{3}$/)
    .nonempty('CEP obrigatório'),
  district: z.string().nonempty('Bairro obrigatório'),
  city: z.string().nonempty('Cidade obrigatória'),
  state: z.string().nonempty('Estado obrigatória'),
});

export function AddressForm() {
  const { register, handleSubmit, formState } = useForm<AddressFormData>({
    resolver: zodResolver(FormSchema),
  });
  const { errors } = formState;

  const handleCreateAddress: SubmitHandler<AddressFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  };

  return (
    <Box
      as="form"
      flex="1"
      borderRadius={8}
      p={['6', '8']}
      onSubmit={handleSubmit(handleCreateAddress)}
    >
      <VStack spacing="8">
        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input
            label="Nome da Rua"
            {...register('street')}
            error={errors.street}
          />
          <Input
            label="Número da rua"
            {...register('street_number')}
            error={errors.street_number}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input
            label="Complemento"
            {...register('complement')}
            error={errors.complement}
          />
          <Input
            label="Bairro"
            {...register('district')}
            error={errors.district}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input label="Cidade" {...register('city')} error={errors.city} />
          <Input label="Estado" {...register('state')} error={errors.state} />
        </SimpleGrid>
      </VStack>
      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <Link href="/admin/eventos">
            <Button colorScheme="gray">Cancelar</Button>
          </Link>
          <Button
            type="submit"
            colorScheme="green"
            bg="green.200"
            isLoading={formState.isSubmitting}
          >
            Salvar
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
