import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Flex,
  HStack,
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
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import * as Yup from 'yup';

import { Input } from '@/components/forms/atomics/Input';
import { InputFile } from '@/components/forms/atomics/InputFile';
import { Radio } from '@/components/forms/atomics/Radio';
import { participantPaymentsServices } from '@/services/participantPaymentsServices';
import { shalomQRCode } from '@/utils/shalomQRcode';

interface IProps {
  registrationId: string;
  disableButton: boolean;
  onSuccess?: () => void;
}

interface ISendPaymentFormData {
  payment_method: string;
  price: string;
  file: string;
}

const signInFormSchema = Yup.object().shape({
  payment_method: Yup.string().required('Método de pagamento obrigatório'),
  price: Yup.string().required('Preço obrigatório'),
  file: Yup.mixed()
    .required('O arquivo é obrigatório')
    .test('fileFormat', 'Formato de arquivo inválido', (value: any) => {
      return ['image/jpeg', 'image/jpg', 'image/png'].includes(
        value['0']?.type,
      );
    }),
});

export function ModalSendPayment({
  registrationId,
  disableButton = false,
  onSuccess,
}: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  const { register, handleSubmit, formState, trigger } =
    useForm<ISendPaymentFormData>({
      resolver: yupResolver(signInFormSchema),
    });
  const { errors } = formState;

  const handleSendPayment: SubmitHandler<ISendPaymentFormData> = async (
    data,
  ) => {
    const { payment_method, price, file } = data;
    const formData = new FormData();

    formData.append('file', file['0']);
    formData.append('payment_method', payment_method);
    formData.append('price', price);

    participantPaymentsServices()
      .create(registrationId, formData)
      .then(() => {
        onSuccess && onSuccess();
        toast.success('Comprovante enviado com sucesso');
        onClose();
      })
      .catch(() => {
        toast.warn(
          'Não foi possível enviar o comprovante. Por favor, tente novamente mais tarde.',
        );
      });
  };

  return (
    <>
      <Tooltip label={disableButton ? 'Enviado' : 'Pagar'} hasArrow>
        <Button
          size="sm"
          fontSize="sm"
          colorScheme="orange"
          isDisabled={disableButton}
          onClick={onOpen}
          width={10}
          height={10}
          borderRadius="full"
        >
          <Icon as={RiMoneyDollarCircleLine} fontSize="20" />
        </Button>
      </Tooltip>
      <Modal
        size="2xl"
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf="center">Comprovante de pagamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Stack spacing="10" direction={['column', 'row']}>
                <VStack spacing="5">
                  <Text fontWeight="bold">INSCRIÇÃO ONLINE (1º Lote)</Text>
                  <Box mb="1rem">
                    <Text fontWeight="medium">
                      Page via PIX e ganhe 10% de desconto
                    </Text>
                    <Box>
                      <Text>Participantes: R$ 252,00</Text>
                      <Text>Servos: R$ 162,00</Text>
                    </Box>
                    <Text mt="1rem">
                      <Text fontWeight="medium">Chave pix:</Text>{' '}
                      eventossobral@comshalom.org
                    </Text>
                    <Text fontWeight="medium" mt="1rem">
                      QR Code:
                    </Text>
                    <QRCode
                      size={200}
                      // style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                      value={shalomQRCode}
                    />
                  </Box>
                  <Box>
                    <Text fontWeight="medium">Pague em até 3X no cartão</Text>
                    <Link
                      target="_blank"
                      href="https://link.ton.com.br/?id=ca341ec2-977a-4e0c-8041-52fcc021e7d2"
                    >
                      <Text color="blue" textDecoration="underline" mb="10px">
                        R$ 280 - Pagar no cartão (Participante)
                      </Text>
                    </Link>
                    <Link
                      target="_blank"
                      href="https://link.ton.com.br/?id=215ec176-55f1-4ca0-838d-0ba653df3b06"
                    >
                      <Text color="blue" textDecoration="underline">
                        R$ 180,00 - Pagar no cartão (Servos)
                      </Text>
                    </Link>
                  </Box>
                </VStack>

                <Flex
                  as="form"
                  width="100%"
                  justifySelf="center"
                  align="center"
                  // p="8"
                  borderRadius={8}
                  flexDir="column"
                  onSubmit={handleSubmit(handleSendPayment)}
                >
                  <Stack spacing="4">
                    <InputFile
                      label="Imagem do comprovante"
                      {...register('file')}
                      error={errors.file}
                    />
                    <Input
                      type="number"
                      placeholder="R$ XXX,XX"
                      min="1"
                      label="Valor pago"
                      {...register('price')}
                      error={errors.price}
                    />
                    <Radio
                      label="Meio de pagamento"
                      {...register('payment_method')}
                      error={errors.payment_method}
                      options={[
                        { value: 'PIX', label: 'PIX' },
                        { value: 'DINHEIRO', label: 'Dinheiro' },
                        {
                          value: 'CARTÃO DE DÉBITO',
                          label: 'Cartão de débito',
                        },
                        {
                          value: 'CARTÃO DE CRÉDITO',
                          label: 'Cartão de crédito',
                        },
                      ]}
                    />
                  </Stack>
                </Flex>
              </Stack>

              <VStack>
                <Text mt="1rem" fontWeight="bold">
                  INSCRIÇÃO PRESENCIAL
                </Text>
                <Box>
                  <Text align="center">
                    SHALOM DO ARCO: Rua Paulo Aragão, 579 - Centro - Sobral,
                    Ceará.
                  </Text>
                  <Text fontSize="0.8em" align="center">
                    (Pagamento em dinheiro, cartão de crédito e cartão de
                    débito.)
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="bold" align="center">
                    DÚVIDAS OU INFORMAÇÕES
                  </Text>
                  <Text>
                    Secretaria PJJ:{' '}
                    <Link href="https://wa.me/5588988624189" target="_blank">
                      <Text
                        _hover={{ cursor: 'pointer' }}
                        as="label"
                        color="blue"
                        textDecoration="underline"
                      >
                        (88) 98862-4189
                      </Text>
                    </Link>
                  </Text>
                </Box>
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button
                type="submit"
                colorScheme="green"
                isLoading={false}
                onClick={handleSubmit(handleSendPayment)}
              >
                Enviar
              </Button>
              <Button onClick={onClose}>Fechar</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
