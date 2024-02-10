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
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { z } from 'zod';
dayjs.extend(utc);

import { Input } from '@/components/forms/atomics/Input';
import { IEvent } from '@/dtos/IEvent';
import { adminEventsServices } from '@/services/adminEventsServices';

type EventFormData = {
  title: string;
  description: string;
  start_date: Date | string;
  end_date: Date | string;
  event?: any;
};

interface Props {
  event?: IEvent;
}

const EventFormSchema = z
  .object({
    title: z.string().nonempty('Título obrigatório'),
    description: z.string().nonempty('Descrição obrigatória'),
    start_date: z.coerce
      .date({
        required_error: 'Data obrigatória',
        invalid_type_error: 'Data inválida',
      })
      .refine(
        (value) => new Date(value) instanceof Date,
        'Data de nascimento inválida',
      ),

    end_date: z.coerce
      .date({
        required_error: 'Data obrigatória',
        invalid_type_error: 'Data inválida',
      })
      .refine(
        (value) => new Date(value) instanceof Date,
        'Data de nascimento inválida',
      ),
  })
  .refine((obj) => obj.start_date <= obj.end_date, {
    message: 'Data de início deve ser menor ou igual à data de encerramento',
    path: ['start_date'],
  });

export function EventForm({ event }: Props) {
  const isUpdate = Boolean(event);
  const router = useRouter();
  const defaultValues = event
    ? {
        title: event.title,
        description: event.description,
        start_date: dayjs(event.start_date).utc().format('YYYY-MM-DD'),
        end_date: dayjs(event.end_date).utc().format('YYYY-MM-DD'),
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
            {...register('start_date')}
            error={errors.start_date}
          />
          <Input
            type="date"
            min={minValidDate}
            label="Data de encerramento"
            {...register('end_date')}
            error={errors.end_date}
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
