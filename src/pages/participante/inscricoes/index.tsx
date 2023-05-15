import { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Flex,
  Heading,
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

import { ModalSendPayment } from '@/components/modals/ModalSendPayment';
import { ModalShowRegistration } from '@/components/modals/ModalShowRegistration';
import { Sidebar } from '@/components/Sidebar';
import { UserHeader } from '@/components/UserHeader';
import { IRegistration } from '@/dtos/IRegistration';
import { participantRegistrationsService } from '@/services/participantRegistrationsServices';
import { withSSRAuth } from '@/utils/withSSRAuth';

export default function Registrations() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [registrations, setRegistrations] = useState<IRegistration[]>([]);

  useEffect(() => {
    participantRegistrationsService()
      .list()
      .then((data) => {
        setRegistrations(data.registrations);
      });
  }, []);

  const registrationFormatted = useMemo(() => {
    return registrations.map((registration) => {
      let addressFormatted = '-';

      if (
        registration?.event?.addresses &&
        registration.event.addresses.length > 0
      ) {
        let address = registration.event.addresses[0];
        addressFormatted = `${address.street}, nº ${address.street_number}, ${address.city} - ${address.state}`;
      }

      return {
        key: registration.id,
        event_title: registration?.event?.title,
        event_start_date: dayjs(registration?.event?.start_date).format(
          'DD/MM/YYYY',
        ),
        event_end_date: dayjs(registration?.event?.end_date).format(
          'DD/MM/YYYY',
        ),
        address: addressFormatted,
        registration: registration,
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
              Inscrições
            </Heading>

            {/* <Link href="/users/create">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo usuário
              </Button>
            </Link> */}
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Evento</Th>
                {isWideVersion && <Th>Local</Th>}
                {isWideVersion && <Th>Início</Th>}
                {isWideVersion && <Th>Fim</Th>}
                <Th>Opções</Th>
              </Tr>
            </Thead>
            <Tbody>
              {registrationFormatted?.map((data) => (
                <Tr px="6" key={data.key}>
                  <Td>
                    <Box>
                      <Text fontWeight="medium">{data.event_title}</Text>
                    </Box>
                  </Td>
                  {isWideVersion && <Td>{data.address}</Td>}
                  {isWideVersion && <Td>{data.event_start_date}</Td>}
                  {isWideVersion && <Td>{data.event_end_date}</Td>}
                  <Td>
                    <Box>
                      <Stack spacing="2">
                        <ModalShowRegistration
                          registration={data.registration}
                        />

                        {data.registration?.payment && (
                          <ModalSendPayment registrationId={data.key} />
                        )}
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

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
