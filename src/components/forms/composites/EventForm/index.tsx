import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import utc from 'dayjs/plugin/utc';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { Input } from '@/components/forms/atomics/Input';
import { adminEventsServices } from '@/services/adminEventsServices';
import { Event } from '@/types/Event';
import { dayjs } from '@/utils/dayjs';

type EventFormData = {
  title: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  event?: any;
};

interface Props {
  event?: Event;
}

const EventFormSchema = z
  .object({
    title: z.string().nonempty('Título obrigatório'),
    description: z.string().nonempty('Descrição obrigatória'),
    startDate: z.coerce
      .date({
        required_error: 'Data obrigatória',
        invalid_type_error: 'Data inválida',
      })
      .refine(
        (value) => new Date(value) instanceof Date,
        'Data de nascimento inválida',
      ),

    endDate: z.coerce
      .date({
        required_error: 'Data obrigatória',
        invalid_type_error: 'Data inválida',
      })
      .refine(
        (value) => new Date(value) instanceof Date,
        'Data de nascimento inválida',
      ),
  })
  .refine((obj) => obj.startDate <= obj.endDate, {
    message: 'Data de início deve ser menor ou igual à data de encerramento',
    path: ['startDate'],
  });

export function EventForm({ event }: Props) {
  const isUpdate = Boolean(event);
  const router = useRouter();
  const defaultValues = event
    ? {
        title: event.title,
        description: event.description,
        startDate: dayjs(event.startDate).utc().format('YYYY-MM-DD'),
        endDate: dayjs(event.endDate).utc().format('YYYY-MM-DD'),
      }
    : undefined;
  const { register, handleSubmit, formState, reset } = useForm<EventFormData>({
    resolver: zodResolver(EventFormSchema),
    defaultValues,
  });
  const { errors } = formState;

  const handleSaveEvent: SubmitHandler<EventFormData> = async (data) => {
    try {
      await (isUpdate
        ? adminEventsServices().update(event!.id, data)
        : adminEventsServices().create(data));

      toast.success(
        `Evento ${isUpdate ? 'atualizado' : 'criado'} com sucesso!`,
      );
      if (!isUpdate) {
        toast.info(
          'Por favor clique em ✏️ editar para adicionar as informações restantes.',
        );
      }
      router.push('/admin/eventos');
    } catch (err) {
      toast.warn(
        `Não foi possível ${isUpdate ? 'atualizar' : 'criar'} o evento`,
      );
    }
  };

  const minValidDate = isUpdate
    ? undefined
    : dayjs(new Date()).format('YYYY-MM-DD');

  return (
    <Box
      as="form"
      flex="1"
      borderRadius={8}
      p={['6', '8']}
      onSubmit={handleSubmit(handleSaveEvent)}
    >
      <VStack spacing="8">
        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input label="Título" {...register('title')} error={errors.title} />
          <Input
            label="Descrição"
            {...register('description')}
            error={errors.description}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input
            type="date"
            label="Data de início"
            min={minValidDate}
            {...register('startDate')}
            error={errors.startDate}
          />
          <Input
            type="date"
            min={minValidDate}
            label="Data de encerramento"
            {...register('endDate')}
            error={errors.endDate}
          />
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
