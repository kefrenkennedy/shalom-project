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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { Input } from '@/components/forms/atomics/Input';
import { adminEventsServices } from '@/services/adminEventsServices';
import { useEffect } from 'react';

type EventFormData = {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  event?: any;
};

interface EventFormProps {
  eventData?: EventFormData;
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
      .min(new Date(), 'Data inválida'),

    end_date: z.coerce
      .date({
        required_error: 'Data obrigatória',
        invalid_type_error: 'Data inválida',
      })
      .min(new Date(), 'Data inválida'),
  })
  .refine((obj) => obj.start_date <= obj.end_date, {
    message: 'Data de início deve ser menor ou igual à data de encerramento',
    path: ['start_date'],
  });



export function EventForm({eventData}: EventFormProps) {
  
  const router = useRouter();
  const { register, handleSubmit, formState, reset } = useForm<EventFormData>({
    resolver: zodResolver(EventFormSchema),
  });
  const { errors } = formState;

  useEffect(() => {
    if (eventData) {
      reset({
        title: eventData.title,
        description: eventData.description,
        end_date: dayjs(eventData.end_date).format('YYYY-MM-DD'),
        start_date: dayjs(eventData.start_date).format('YYYY-MM-DD')
      })
    }
  }, [eventData, reset])

  const handleCreateEvent: SubmitHandler<EventFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);

    adminEventsServices()
      .create(data)
      .then(() => {
        toast.success('Evento criado com sucesso');
        router.push('/admin/eventos/editar');
      })
      .catch(() => {
        toast.warn('Não foi possível criar o evento');
      });
  };

  const minValidDate = dayjs(new Date()).format('YYYY-MM-DD');

  return (
    <Box
      as="form"
      flex="1"
      borderRadius={8}
      p={['6', '8']}
      onSubmit={handleSubmit(handleCreateEvent)}
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
