import { useCallback, useEffect, useMemo, useState } from 'react';
import { RiCheckboxCircleLine, RiCheckLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
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

import { ModalShowPayment } from '@/components/modals/ModalShowPayment';
import { ModalShowRegistration } from '@/components/modals/ModalShowRegistration';
import { Sidebar } from '@/components/Sidebar';
import { UserHeader } from '@/components/UserHeader';
import { IParticipant } from '@/dtos/IParticipant';
import { IRegistration } from '@/dtos/IRegistration';
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

  useEffect(() => {
    getRegistrations();
  }, [getRegistrations]);

  const registrationsFormatted = useMemo(() => {
    return registrations.map((registration) => {
      const participant = registration?.user?.participant as IParticipant;
      return {
        key: registration.id,
        full_name: participant?.full_name,
        phone_number: `(${participant?.phone_number.slice(
          0,
          2,
        )}) ${participant?.phone_number.slice(
          2,
          3,
        )} ${participant?.phone_number.slice(3)}`,
        age: participant?.birthdate
          ? dayjs(new Date()).diff(participant?.birthdate, 'years')
          : '-',
        status: registration.is_approved
          ? 'Aprovada'
          : translateRegistrationStatus(registration?.payment?.status),
        registration: registration,
        is_approved: registration.is_approved,
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

          <Table colorScheme="gray">
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
              {registrationsFormatted?.map((data) => (
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
                          label={data.is_approved ? 'Já aprovada' : 'Aprovar'}
                          hasArrow
                        >
                          <Button
                            size="sm"
                            fontSize="sm"
                            borderRadius="full"
                            width={10}
                            height={10}
                            colorScheme="green"
                            isDisabled={!!data.is_approved}
                            onClick={() => handleConfirmRegistration(data.key)}
                          >
                            <Icon as={RiCheckboxCircleLine} fontSize="20" />
                          </Button>
                        </Tooltip>
                      </HStack>
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
