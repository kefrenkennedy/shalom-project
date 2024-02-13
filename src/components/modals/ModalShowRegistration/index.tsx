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

import { Participant } from '@/types/Participant';
import { Registration } from '@/types/Registration';
import { dayjs } from '@/utils/dayjs';
import { translatePaymentStatus } from '@/utils/translatePaymentStatus';

interface IProps {
  registration: Registration;
}

export function ModalShowRegistration({ registration }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  const dataFormatted = useMemo(() => {
    const participant = registration?.participant as Participant;
    let address;

    if (participant?.addresses && participant?.addresses?.length > 0) {
      address = participant?.addresses[0];
    } else if (
      registration?.user?.addresses &&
      registration?.user?.addresses?.length > 0
    ) {
      address = registration?.user?.addresses[0];
    }

    let addressFormatted = '-';

    if (address) {
      const {
        street,
        streetNumber: street_number,
        complement,
        district,
        city,
        state,
        zipCode: zip_code,
      } = address;

      addressFormatted = `
        ${street}, nº ${street_number} - ${complement}, ${district}, 
        ${city} - ${state} CEP: ${zip_code}`;
    }

    const birthdateFormatted =
      participant?.birthdate &&
      dayjs(participant?.birthdate).format('DD/MM/YYYY');

    const participantAge = dayjs(new Date()).diff(
      participant?.birthdate,
      'years',
    );

    return {
      event_title: registration.event?.title || '-',
      full_name: participant?.fullName ?? '-',
      email:
        registration.participant?.email ?? registration?.user?.email ?? '-',
      birthdate: participant?.birthdate
        ? `${birthdateFormatted} (${participantAge} anos)`
        : '-',
      phone_number: participant.phoneNumber ?? '-',
      document: participant
        ? `${participant?.documentNumber} (${participant?.documentType})`
        : '-',
      guardian_name: participant?.guardianName ?? '-',
      guardian_phone_number: participant?.guardianPhoneNumber ?? '-',
      address: addressFormatted,
      prayer_group: participant?.prayerGroup ?? '-',
      community_type: participant?.community_type ?? '-',
      pcd_description: participant?.pcdDescription ?? '-',
      allergy_description: participant?.allergyDescription ?? '-',
      medication_use_description: participant?.medicationUseDescription ?? '-',
      transportation_mode: registration?.transportationMode ?? '-',
      event_source: registration?.eventSource ?? '-',
      accepted_the_terms: registration?.acceptedTheTerms ? 'Sim' : 'Não',
      status: registration.isApproved ? 'Aprovada' : 'Aguardando aprovação',
      payment_status: translatePaymentStatus(registration?.payment?.status),
      type: registration?.type ?? '-',
      has_participated_previously: registration?.hasParticipatedPreviously
        ? 'Sim'
        : 'Não',
      created_at: dayjs(registration.createdAt).format('DD/MM/YYYY HH:mm'),
      credential_name: registration.credentialName,
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
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dados de inscrição</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" align="center">
              DADOS PESSOAIS
            </Text>

            <Stack direction="row">
              <Text fontWeight="bold">Nome:</Text>
              <Text>{dataFormatted.full_name}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">E-mail:</Text>
              <Text>{dataFormatted.email}</Text>
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
              <Text fontWeight="bold">Endereço:</Text>
              <Text>{dataFormatted.address}</Text>
            </Stack>

            <Text fontWeight="bold" align="center" mt="1rem">
              DADOS PARA O EVENTO
            </Text>

            <Stack direction="row">
              <Text fontWeight="bold">Evento:</Text>
              <Text>{dataFormatted.event_title}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Nome da credencial:</Text>
              <Text>{dataFormatted.credential_name}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Nome do grupo de oração:</Text>
              <Text>{dataFormatted.prayer_group}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Como ficou sabendo do evento:</Text>
              <Text>{dataFormatted.event_source}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">{"Participou de outros ACAMP'S:"}</Text>
              <Text>{dataFormatted.has_participated_previously}</Text>
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
              <Text fontWeight="bold">Uso de medicamentos:</Text>
              <Text>{dataFormatted.medication_use_description}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Transporte para o evento:</Text>
              <Text>{dataFormatted.transportation_mode}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Aceitou os termos:</Text>
              <Text>{dataFormatted.accepted_the_terms}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Tipo de inscrição:</Text>
              <Text>{dataFormatted.type}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Status da inscrição:</Text>
              <Text>{dataFormatted.status}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Status de pagamento:</Text>
              <Text>{dataFormatted.payment_status}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Data de inscrição:</Text>
              <Text>{dataFormatted.created_at}</Text>
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
