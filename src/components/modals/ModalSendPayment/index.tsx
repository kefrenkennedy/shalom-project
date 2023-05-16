import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

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
  useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Input } from '@/components/forms/Input';
import { InputFile } from '@/components/forms/InputFile';
import { Radio } from '@/components/forms/Radio';
import { participantPaymentsServices } from '@/services/participantPaymentsServices';

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
      <Button
        size="sm"
        fontSize="sm"
        colorScheme="orange"
        leftIcon={<Icon as={RiMoneyDollarCircleLine} fontSize="16" />}
        isDisabled={disableButton}
        onClick={onOpen}
      >
        {disableButton ? 'Enviado' : 'Pagar'}
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comprovante de pagamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              as="form"
              width="100%"
              justifySelf="center"
              align="center"
              p="8"
              borderRadius={8}
              flexDir="column"
              onSubmit={handleSubmit(handleSendPayment)}
            >
              <Stack spacing="4">
                <InputFile
                  label="Imagem"
                  {...register('file')}
                  error={errors.file}
                />
                <Input
                  type="number"
                  placeholder="R$ XXX,XX"
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
                    { value: 'CARTÃO DE DÉBITO', label: 'Cartão de débito' },
                    { value: 'CARTÃO DE CRÉDITO', label: 'Cartão de crédito' },
                  ]}
                />
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme="green"
              isLoading={false}
              onClick={handleSubmit(handleSendPayment)}
            >
              Enviar
            </Button>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
