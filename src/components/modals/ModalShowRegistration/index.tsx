import { ReactNode, useRef } from 'react';
import { RiEyeLine } from 'react-icons/ri';

import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { IRegistration } from '@/dtos/IRegistration';

interface IProps {
  registration: IRegistration;
}

export function ModalShowRegistration({ registration }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <>
      <Button
        w="100px"
        size="sm"
        fontSize="sm"
        colorScheme="green"
        bg="green.200"
        leftIcon={<Icon as={RiEyeLine} fontSize="16" />}
        onClick={onOpen}
      >
        Detalhes
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dados de inscrição</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="row">
              <Text fontWeight="bold">Evento:</Text>
              <Text>{registration?.event?.title || '-'}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Nome:</Text>
              <Text>{registration.full_name}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Idade:</Text>
              <Text>{registration.age}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Telefone:</Text>
              <Text>{registration.phone_number}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Documento:</Text>
              <Text>
                {registration.document_number} ({registration.document_type})
              </Text>
            </Stack>

            {registration.guardian_name && (
              <>
                <Stack direction="row">
                  <Text fontWeight="bold">Nome do responsável:</Text>
                  <Text>{registration.guardian_name}</Text>
                </Stack>

                <Stack direction="row">
                  <Text fontWeight="bold">Telefone do responsável:</Text>
                  <Text>{registration.guardian_phone_number || '-'}</Text>
                </Stack>
              </>
            )}

            <Stack direction="row">
              <Text fontWeight="bold">Nome do grupo de oração:</Text>
              <Text>{registration.prayer_group || '-'}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Como ficou sabendo do evento:</Text>
              <Text>{registration.event_source || '-'}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Tipo de comunidade:</Text>
              <Text>{registration.community_type || '-'}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Pessoa Portadora de deficiêcia:</Text>
              <Text>{registration.pcd_description || '-'}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Alergias:</Text>
              <Text>{registration.allergy_description || '-'}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Transpor para o evento:</Text>
              <Text>{registration.transportation_mode}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Aceitou os termos:</Text>
              <Text>{registration.accepted_the_terms ? 'Sim' : 'Não'}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Status da Inscrição:</Text>
              <Text>
                {registration.is_approved ? 'APROVADA' : 'AGUARDANDO PAGAMENTO'}
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
