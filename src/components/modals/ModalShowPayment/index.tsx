import { useRef } from 'react';
import { RiEyeLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import {
  Box,
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
import Image from 'next/image';

import { adminPaymentsServices } from '@/services/adminPaymentsServices';
import { Payment } from '@/types/Payment';
import { generateImageUrl } from '@/utils/generateImageUrl';
import { translatePaymentStatus } from '@/utils/translatePaymentStatus';

interface IProps {
  payment?: Payment;
  onSuccess?: () => void;
}

export function ModalShowPayment({ payment, onSuccess }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  function handleUpdatePaymentStatus() {
    if (payment) {
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
  }

  return (
    <>
      <Tooltip label="Pagamento" hasArrow>
        <Button
          size="sm"
          fontSize="sm"
          borderRadius="full"
          width={10}
          height={10}
          colorScheme="orange"
          onClick={onOpen}
        >
          <Icon as={RiMoneyDollarCircleLine} fontSize="20" />
        </Button>
      </Tooltip>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comprovante de pagamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {payment ? (
              <Box>
                <Stack direction="row">
                  <Text fontWeight="bold">Método de pagamento:</Text>
                  <Text>{payment?.paymentMethod || '-'}</Text>
                </Stack>

                <Stack direction="row">
                  <Text fontWeight="bold">Valor pago:</Text>
                  <Text>{payment.price}</Text>
                </Stack>

                <Stack direction="row">
                  <Text fontWeight="bold">Status de pagamento:</Text>
                  <Text>{translatePaymentStatus(payment.status)}</Text>
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
              </Box>
            ) : (
              <Text>Comprovante de pagamento não encontrado</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Stack direction="row">
              <Button
                colorScheme="green"
                isDisabled={payment?.status === 'approved'}
                onClick={handleUpdatePaymentStatus}
              >
                {payment?.status === 'approved'
                  ? 'Pagamento confirmado'
                  : 'Confirmar pagamento'}
              </Button>
              <Button onClick={onClose}>Fechar</Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
