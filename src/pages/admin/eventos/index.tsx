import { useEffect, useState } from 'react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
dayjs.extend(utc);

import { Sidebar } from '@/components/Sidebar';
import { UserHeader } from '@/components/UserHeader';
import { IEvent } from '@/dtos/IEvent';
import { eventsServices } from '@/services/eventsServices';

export default function Events() {
  const router = useRouter();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [events, setEvents] = useState<IEvent[]>([]);

  function getEvents() {
    eventsServices()
      .list()
      .then((data) => {
        setEvents(data.events);
      });
  }

  function moveToCreateEvent() {
    router.push('/admin/eventos/criar');
  }

  function moveToEditEvent(eventId: string) {
    router.push(`/admin/eventos/editar?event_id=${eventId}`);
  }

  useEffect(() => {
    getEvents();
  }, []);

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
              Eventos
            </Heading>

            {/* <Link href="/admin/eventos/criar"></Link> */}
            <Button
              size="sm"
              fontSize="sm"
              color="white"
              colorScheme="yellow"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              onClick={moveToCreateEvent}
            >
              Novo evento
            </Button>
          </Flex>

          <Table colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Título</Th>
                {isWideVersion && <Th>Início</Th>}
                {isWideVersion && <Th>Encerramento</Th>}
                <Th>Opções</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events?.map((data) => (
                <Tr px="6" key={data.id}>
                  <Td>
                    <Box>
                      <Text fontWeight="medium">{data.title}</Text>
                    </Box>
                  </Td>
                  {isWideVersion && (
                    <Td>{dayjs(data.start_date).utc().format('DD/MM/YYYY')}</Td>
                  )}
                  {isWideVersion && (
                    <Td>{dayjs(data.end_date).utc().format('DD/MM/YYYY')}</Td>
                  )}

                  <Td>
                    <Box>
                      <Stack spacing="2">
                        <Button
                          size="sm"
                          fontSize="sm"
                          colorScheme="green"
                          bg="green.200"
                          leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          onClick={() => moveToEditEvent(data.id)}
                        >
                          Editar
                        </Button>
                      </Stack>
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}
