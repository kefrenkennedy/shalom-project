import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  RiCheckboxCircleFill,
  RiCheckboxCircleLine,
  RiTable2,
} from 'react-icons/ri';
import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import { Select } from '@/components/forms/atomics/Select';
import { ModalShowPayment } from '@/components/modals/ModalShowPayment';
import { ModalShowRegistration } from '@/components/modals/ModalShowRegistration';
import { Sidebar } from '@/components/Sidebar';
import { UserHeader } from '@/components/UserHeader';
import { IEvent } from '@/dtos/IEvent';
import { IParticipant } from '@/dtos/IParticipant';
import { IRegistration } from '@/dtos/IRegistration';
import { adminExportRegistrationsServices } from '@/services/adminExportRegistrationsServices';
import { adminRegistrationsService } from '@/services/adminRegistrationsServices';
import { eventsServices } from '@/services/eventsServices';
import { translatePaymentStatus } from '@/utils/translatePaymentStatus';
import { withSSRAuth } from '@/utils/withSSRAuth';

export default function Registrations() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [events, setEvents] = useState<IEvent[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<string>('');

  const [registrations, setRegistrations] = useState<IRegistration[]>([]);

  function getEvents() {
    eventsServices()
      .list()
      .then((data) => {
        setEvents(data.events);
      });
  }

  const getRegistrations = useCallback(() => {
    if (!selectedEvent) return setRegistrations([]);
    adminRegistrationsService()
      .list(selectedEvent)
      .then((data) => {
        setRegistrations(data.registrations);
      });
  }, [selectedEvent]);

  function handleConfirmRegistration(id: string) {
    adminRegistrationsService()
      .update(id)
      .then(() => {
        getRegistrations();
        toast.success('Inscrição aprovada com sucesso');
      })
      .catch((err) => {
        toast.warn('Não foi possível confirmar a inscrição');
      });
  }

  function handleExportRegistration() {
    adminExportRegistrationsServices().export(selectedEvent);
  }

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    getRegistrations();
  }, [getRegistrations]);

  const eventsFormatted = useMemo(() => {
    return events.map((event) => {
      return {
        value: event.id,
        label: event.title,
      };
    });
  }, [events]);

  const registrationsFormatted = useMemo(() => {
    return registrations.map((registration) => {
      const participant = registration?.participant as IParticipant;
      return {
        key: registration.id,
        full_name: participant?.full_name,
        type: registration?.type ?? '-',
        age: participant?.birthdate
          ? dayjs(new Date()).diff(participant?.birthdate, 'years')
          : '-',
        payment_status: translatePaymentStatus(registration?.payment?.status),
        registration_status: registration.is_approved
          ? 'Aprovada'
          : 'Aguardando',
        registration: registration,
        is_approved: registration.is_approved,
        created_at: dayjs(registration.created_at).format('DD/MM/YYYY HH:mm'),
      };
    });
  }, [registrations]);

  return (
    <Box h="100vh">
      <UserHeader />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box
          flex="1"
          borderRadius={8}
          bg="gray.50"
          p="8"
          borderColor="gray.100"
          borderWidth="1px"
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="medium" color="gray.500">
              <Flex align="center" gap="6">
                Inscrições
                <Select
                  name="select-event"
                  title="Selecionar evento"
                  placeholder="Selecionar evento"
                  onChange={({ target: { value } }) => setSelectedEvent(value)}
                  options={eventsFormatted}
                />
              </Flex>
            </Heading>

            {!!selectedEvent && (
              <Button
                size="sm"
                fontSize="sm"
                colorScheme="green"
                onClick={handleExportRegistration}
                leftIcon={<Icon as={RiTable2} fontSize="20" />}
              >
                Baixar CSV
              </Button>
            )}
          </Flex>

          {!selectedEvent ? (
            <Text>
              Selecione um evento acima para ver os dados correspondentes.
            </Text>
          ) : (
            <Table colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Participante</Th>
                  {isWideVersion && <Th>Idade</Th>}
                  {isWideVersion && <Th>Status</Th>}
                  {isWideVersion && <Th>Pagamento</Th>}
                  {isWideVersion && <Th>Tipo</Th>}
                  {isWideVersion && <Th>Data</Th>}
                  <Th>Opções</Th>
                </Tr>
              </Thead>
              <Tbody>
                {registrationsFormatted?.map((data) => (
                  <Tr px="6" key={data.key}>
                    <Td>
                      <Box>
                        <Text fontWeight="medium">{data.full_name}</Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>{data.age}</Td>}
                    {isWideVersion && <Td>{data.registration_status}</Td>}
                    {isWideVersion && <Td>{data.payment_status}</Td>}
                    {isWideVersion && <Td>{data.type}</Td>}
                    {isWideVersion && <Td>{data.created_at}</Td>}

                    <Td>
                      <Box>
                        <HStack spacing="2">
                          <ModalShowRegistration
                            registration={data.registration}
                          />

                          {data.registration.payment && (
                            <ModalShowPayment
                              payment={data.registration.payment}
                              onSuccess={() =>
                                handleConfirmRegistration(data.key)
                              }
                            />
                          )}

                          <Tooltip
                            label={
                              data.is_approved
                                ? 'Inscrição Aprovada'
                                : 'Aguardando aprovação'
                            }
                            hasArrow
                          >
                            <Button
                              size="sm"
                              fontSize="sm"
                              borderRadius="full"
                              width={10}
                              height={10}
                              colorScheme={data.is_approved ? 'green' : 'gray'}
                              bgColor={
                                data.is_approved ? 'green.500' : 'gray.300'
                              }
                              color="white"
                              onClick={() =>
                                handleConfirmRegistration(data.key)
                              }
                            >
                              <Icon
                                as={
                                  data.is_approved
                                    ? RiCheckboxCircleFill
                                    : RiCheckboxCircleLine
                                }
                                fontSize="20"
                              />
                            </Button>
                          </Tooltip>
                        </HStack>
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

// export const getServerSideProps = withSSRAuth(async (ctx) => {
//   return {
//     props: {},
//   };
// });
