import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  Box,
  Button,
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

import { ModalSendPayment } from '@/components/modals/ModalSendPayment';
import { ModalShowPayment } from '@/components/modals/ModalShowPayment';
import { ModalShowRegistration } from '@/components/modals/ModalShowRegistration';
import { Sidebar } from '@/components/Sidebar';
import { UserHeader } from '@/components/UserHeader';
import { IRegistration } from '@/dtos/IRegistration';
import { adminPaymentsServices } from '@/services/adminPaymentsServices';
import { adminRegistrationsService } from '@/services/adminRegistrationsServices';
import { translateRegistrationStatus } from '@/utils/translateRegistrationStatus';
import { withSSRAuth } from '@/utils/withSSRAuth';

export default function Registrations() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [registrations, setRegistrations] = useState<IRegistration[]>([]);

  const EVENT_ID = String(process.env.NEXT_PUBLIC_EVENT_ID);

  const getRegistrations = useCallback(() => {
    adminRegistrationsService()
      .list(EVENT_ID)
      .then((data) => {
        setRegistrations(data.registrations);
      });
  }, [EVENT_ID]);

  useEffect(() => {
    getRegistrations();
  }, [getRegistrations]);

  const registrationFormatted = useMemo(() => {
    return registrations.map((registration) => {
      return {
        key: registration.id,
        full_name: registration?.full_name,
        phone_number: `(${registration?.phone_number.slice(
          0,
          2,
        )}) ${registration?.phone_number.slice(
          2,
          3,
        )} ${registration?.phone_number.slice(3)}`,
        age: registration?.age,
        status: translateRegistrationStatus(registration?.payment?.status),
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
                <Th>Participante</Th>
                {isWideVersion && <Th>Telefone</Th>}
                {isWideVersion && <Th>Idade</Th>}
                {isWideVersion && <Th>Status</Th>}
                <Th>Opções</Th>
              </Tr>
            </Thead>
            <Tbody>
              {registrationFormatted?.map((data) => (
                <Tr px="6" key={data.key}>
                  <Td>
                    <Box>
                      <Text fontWeight="medium">{data.full_name}</Text>
                    </Box>
                  </Td>
                  {isWideVersion && <Td>{data.phone_number}</Td>}
                  {isWideVersion && <Td>{data.age}</Td>}
                  {isWideVersion && <Td>{data.status}</Td>}

                  <Td>
                    <Box>
                      <Stack spacing="2">
                        <ModalShowRegistration
                          registration={data.registration}
                        />

                        {data.registration.payment && (
                          <ModalShowPayment
                            payment={data.registration.payment}
                            onSuccess={getRegistrations}
                          />
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
