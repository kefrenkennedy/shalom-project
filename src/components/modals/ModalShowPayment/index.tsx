import { useRef } from 'react';
import { RiEyeLine } from 'react-icons/ri';
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
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';

import { IPayment } from '@/dtos/IPayment';
import { adminPaymentsServices } from '@/services/adminPaymentsServices';
import { generateImageUrl } from '@/utils/generateImageUrl';
import { translateRegistrationStatus } from '@/utils/translateRegistrationStatus';

interface IProps {
  payment: IPayment;
  onSuccess?: () => void;
}

export function ModalShowPayment({ payment, onSuccess }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  function handleUpdatePaymentStatus() {
    adminPaymentsServices()
      .update(payment.id)
      .then(() => {
        onSuccess && onSuccess();
        onClose();
        toast.success('Pagamento confirmado com sucesso');
      })
      .catch(() => {
        toast.warn(
          'Não foi possível atualizar o pagamento, tente novamente mais tarde',
        );
      });
  }

  return (
    <>
      <Button
        size="sm"
        fontSize="sm"
        colorScheme="orange"
        leftIcon={<Icon as={RiEyeLine} fontSize="16" />}
        onClick={onOpen}
      >
        Pagamento
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comprovante de pagamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="row">
              <Text fontWeight="bold">Método de pagamento:</Text>
              <Text>{payment?.payment_method || '-'}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Valor pago:</Text>
              <Text>{payment.price}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Status de pagamento:</Text>
              <Text>{translateRegistrationStatus(payment.status)}</Text>
            </Stack>

            <Stack direction="row">
              <Text fontWeight="bold">Comprovante:</Text>
            </Stack>
            <Image
              src={generateImageUrl(payment.file)}
              alt="Comprovante de pagamento"
              width={1000}
              height={1000}
            />
          </ModalBody>

          <ModalFooter>
            <Stack direction="row">
              <Button
                colorScheme="green"
                isDisabled={payment.status === 'approved'}
                onClick={handleUpdatePaymentStatus}
              >
                Aprovar
              </Button>
              <Button onClick={onClose}>Fechar</Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
