import { useMemo, useRef } from 'react';
import { RiEyeLine } from 'react-icons/ri';

import {
  Button,
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
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import { IParticipant } from '@/dtos/IParticipant';
import { IRegistration } from '@/dtos/IRegistration';
import { translatePaymentStatus } from '@/utils/translatePaymentStatus';

interface IProps {
  registration: IRegistration;
}

export function ModalShowRegistration({ registration }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  const dataFormatted = useMemo(() => {
    const participant = registration?.user?.participant as IParticipant;
    return {
      event_title: registration.event?.title || '-',
      full_name: participant?.full_name ?? '-',
      birthdate: participant?.birthdate
        ? dayjs(participant?.birthdate).format('DD/MM/YYYY')
        : '-',
      phone_number: participant.phone_number ?? '-',
      document: participant
        ? `${participant?.document_number} (${participant?.document_type})`
        : '-',
      guardian_name: participant?.guardian_name ?? '-',
      guardian_phone_number: participant?.guardian_phone_number ?? '-',
      prayer_group: participant?.prayer_group ?? '-',
      community_type: participant?.community_type ?? '-',
      pcd_description: participant?.pcd_description ?? '-',
      allergy_description: participant?.allergy_description ?? '-',
      transportation_mode: registration?.transportation_mode ?? '-',
      event_source: registration?.event_source ?? '-',
      accepted_the_terms: registration?.accepted_the_terms ? 'Sim' : 'Não',
      status: registration.is_approved ? 'Aprovada' : 'Aguardando',
      pagamento: translatePaymentStatus(registration?.payment?.status),
    };
  }, [registration]);

  return (
    <>
      <Tooltip label="Detalhes" hasArrow>
        <Button
          size="sm"
          fontSize="sm"
          colorScheme="green"
          bg="green.200"
          width={10}
          height={10}
          borderRadius="full"
          onClick={onOpen}
        >
          <Icon as={RiEyeLine} fontSize="20" />
        </Button>
      </Tooltip>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dados de inscrição</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="row">
              <Text fontWeight="bold">Evento:</Text>
              <Text>{dataFormatted.event_title}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Nome:</Text>
              <Text>{dataFormatted.full_name}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Data de nascimento:</Text>
              <Text>{dataFormatted.birthdate}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Telefone:</Text>
              <Text>{dataFormatted.phone_number}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Documento:</Text>
              <Text>{dataFormatted.document}</Text>
            </Stack>

            {dataFormatted.guardian_name && (
              <>
                <Stack direction="row">
                  <Text fontWeight="bold">Nome do responsável:</Text>
                  <Text>{dataFormatted.guardian_name}</Text>
                </Stack>

                <Stack direction="row">
                  <Text fontWeight="bold">Telefone do responsável:</Text>
                  <Text>{dataFormatted.guardian_phone_number}</Text>
                </Stack>
              </>
            )}

            <Stack direction="row">
              <Text fontWeight="bold">Nome do grupo de oração:</Text>
              <Text>{dataFormatted.prayer_group}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Como ficou sabendo do evento:</Text>
              <Text>{dataFormatted.event_source}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Tipo de comunidade:</Text>
              <Text>{dataFormatted.community_type}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">PCD:</Text>
              <Text>{dataFormatted.pcd_description}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Alergias:</Text>
              <Text>{dataFormatted.allergy_description}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Transpor para o evento:</Text>
              <Text>{dataFormatted.transportation_mode}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Aceitou os termos:</Text>
              <Text>{dataFormatted.accepted_the_terms}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Status de pagamento:</Text>
              <Text>{dataFormatted.status}</Text>
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
