import { SubmitHandler, useForm } from 'react-hook-form';
import { RiAddBoxLine, RiAddLine } from 'react-icons/ri';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { z } from 'zod';

import { TicketCard } from '@/components/cards/TicketCard';
import { Input } from '@/components/forms/atomics/Input';
import { AddressForm } from '@/components/forms/composites/AddressForm';
import { EventForm } from '@/components/forms/composites/EventForm';
import { Sidebar } from '@/components/Sidebar';
import { UserHeader } from '@/components/UserHeader';

type EventFormData = {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;

  street: string;
  street_number: string;
  complement: string;
  zip_code: string;
  district: string;
  city: string;
  state: string;
};

const EventFormSchema = z
  .object({
    title: z.string().nonempty('Título obrigatório'),
    description: z.string().nonempty('Descrição obrigatória'),
    start_date: z.coerce.date({
      required_error: 'Data obrigatória',
      invalid_type_error: 'Data inválida',
    }),
    end_date: z.coerce.date({
      required_error: 'Data obrigatória',
      invalid_type_error: 'Data inválida',
    }),

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
  })
  .refine((obj) => obj.start_date <= obj.end_date, {
    message: 'Data de início deve ser menor ou igual à data de encerramento',
    path: ['start_date'],
  });

export default function CreateEvent() {
  const { register, handleSubmit, formState } = useForm<EventFormData>({
    resolver: zodResolver(EventFormSchema),
  });
  const { errors } = formState;

  const handleCreateUser: SubmitHandler<EventFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  };

  return (
    <Box>
      <UserHeader />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Flex direction="column" w="100%">
          <Heading size="lg" fontWeight="normal">
            Editar evento
          </Heading>

          <Tabs isFitted variant="soft-rounded" colorScheme="green" mt="10">
            <TabList>
              <Tab>Evento</Tab>
              <Tab>Endereço</Tab>
              <Tab>Lotes</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <EventForm />
              </TabPanel>
              <TabPanel>
                <AddressForm />
              </TabPanel>
              <TabPanel>
                <VStack>
                  <Box w="100%">
                    <SimpleGrid
                      spacing={4}
                      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                      mt="2rem"
                    >
                      <TicketCard />

                      <Button width="100%" height="100%">
                        <Icon as={RiAddLine} fontSize="5rem" color="gray.600" />
                      </Button>
                    </SimpleGrid>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Box>
  );
}
