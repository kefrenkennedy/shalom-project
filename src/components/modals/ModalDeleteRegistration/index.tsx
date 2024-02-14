import { useRef } from 'react';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { toast } from 'react-toastify';

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

import { adminRegistrationsService } from '@/services/adminRegistrationsServices';
import { Registration } from '@/types/Registration';
import { dayjs } from '@/utils/dayjs';

interface IProps {
  registration: Registration;
  onSuccess?: () => void;
}

export function ModalDeleteRegistration({ registration, onSuccess }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  function handleDeleteRegistration() {
    adminRegistrationsService()
      .delete(registration.id)
      .then(() => {
        if (onSuccess) onSuccess();
        onClose();
        toast.success('Inscrição removida com sucesso');
      })
      .catch((err) => {
        toast.warn('Não foi possível remover a inscrição');
      });
  }

  const fullName =
    registration?.participant?.fullName ?? registration.credentialName;

  const date = dayjs(registration.createdAt).format('DD/MM/YYYY HH:mm');

  return (
    <>
      <Tooltip label="Remover inscrição" hasArrow>
        <Button
          size="sm"
          fontSize="sm"
          colorScheme="red"
          width={10}
          height={10}
          borderRadius="full"
          onClick={onOpen}
        >
          <Icon as={RiDeleteBin7Line} fontSize="20" />
        </Button>
      </Tooltip>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atenção</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text align="initial">
              Tem certeza que deseja apagar a inscrição de{' '}
              <Text as="span" fontWeight="bold">
                {fullName}
              </Text>{' '}
              realizada em{' '}
              <Text as="span" fontWeight="bold">
                {date}
              </Text>
              ?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Stack direction="row">
              <Button onClick={onClose}>Fechar</Button>
              <Button colorScheme="red" onClick={handleDeleteRegistration}>
                Confirmar
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
