import React, { useMemo } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  Image,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  Text,
  useSteps,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { cpf } from 'cpf-cnpj-validator';
import Link from 'next/link';
import { z } from 'zod';

import { Checkbox } from '@/components/forms/atomics/Checkbox';
import { Input } from '@/components/forms/atomics/Input';
import { InputMasked } from '@/components/forms/atomics/InputMasked';
import { Radio } from '@/components/forms/atomics/Radio';
import { registerUserParticipantsServices } from '@/services/registerUserParticipantsServices';
import { dayjs } from '@/utils/dayjs';
import { jsonToFormData } from '@/utils/jsonToFormData';
import { shalomQRCode } from '@/utils/shalomQRcode';

import { InputFile } from '../../atomics/InputFile';

type SignInFormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  birthdate: Date;
  documentType: string;
  documentNumber: string;
  guardianName?: string;
  guardianPhoneNumber?: string;
  prayerGroup?: string;
  communityType?: string;
  pcdDescription?: string;
  allergyDescription?: string;
  medicationUseDescription?: string;

  street: string;
  streetNumber: string;
  complement: string;
  zipCode: string;
  district: string;
  city: string;
  state: string;

  // event_id: string;
  eventSource?: string;
  credentialName: string;
  transportationMode: string;
  acceptedTheTerms: boolean;
  hasParticipatedPreviously: boolean;
  type: string;

  paymentMethod: string;
  price: string;
  file: string;
};

const FormSchema = z
  .object({
    fullName: z.string().min(5, 'Nome muito curto'),
    email: z.string().email('E-mail inválido'),
    phoneNumber: z
      .string()
      .min(15, 'Telefone inválido')
      .transform((val) => val.replace(/_/g, ''))
      .refine(
        (value) => value.replace(/_/g, '').length === 15,
        'Telefone inválido',
      ),
    birthdate: z.coerce
      .date({
        invalid_type_error: 'Data de nascimento inválida',
        required_error: 'Data de nascimento obrigatório',
      })
      .refine(
        (value) => new Date(value) instanceof Date,
        'Data de nascimento inválida',
      ),
    documentType: z.enum(['CPF', 'RG'], {
      invalid_type_error: 'Selecione um tipo de documento',
      required_error: 'Documento obrigatório',
    }),
    documentNumber: z
      .string()
      .min(7, 'Documento inválido')
      .transform((val) => val.replace(/_/g, '')),
    guardianName: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    guardianPhoneNumber: z
      .string()
      .optional()
      .transform((val) => {
        if (val === '' || !val) return undefined;
        return val.replace(/_/g, '');
      })
      .refine((value) => {
        if (!value) return true;
        return value.replace(/_/g, '').length === 15;
      }, 'Telefone inválido'),
    prayerGroup: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    communityType: z
      .enum(['VIDA', 'ALIANÇA', ''])
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    pcdDescription: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    allergyDescription: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    medicationUseDescription: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),

    street: z.string().nonempty('Rua obrigatória'),
    streetNumber: z.string().nonempty('Número da rua obrigatória'),
    complement: z.string(),
    zipCode: z
      .string()
      // .regex(/^\d{5}-\d{3}$/, 'CEP inválido')
      .nonempty('CEP obrigatório'),
    district: z.string().nonempty('Bairro obrigatório'),
    city: z.string().nonempty('Cidade obrigatória'),
    state: z.string().nonempty('Estado obrigatória'),

    credentialName: z
      .string()
      .min(5, 'Nome para credencial muito curto')
      .max(18, 'Nome para credencial muito grande'),
    eventSource: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    transportationMode: z.enum(['TRANSPORTE PRÓPRIO', 'ÔNIBUS'], {
      required_error: 'Meio de Transporte obrigatório',
      invalid_type_error: 'Selecione uma opção de transporte',
    }),
    type: z.enum(['SERVO', 'PARTICIPANTE']),
    hasParticipatedPreviously: z.coerce.boolean(),
    acceptedTheTerms: z
      .boolean({ required_error: 'Campo obrigatório' })
      .refine(
        (value) => value === true,
        'Você deve aceitar os termos para finalizar',
      ),

    paymentMethod: z.string().nonempty('Método de pagamento obrigatório'),
    price: z.string().nonempty('Preço obrigatório'),
    file: z
      .any()
      .refine((value) => value.length > 0, 'O arquivo é obrigatório')
      .refine((value) => {
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(
          value['0']?.type,
        );
      }, 'Formato de arquivo inválido'),
  })
  .strict()
  .refine(
    (data) =>
      data.documentType === 'CPF' ? cpf.isValid(data.documentNumber) : true,
    {
      message: 'CPF inválido',
      path: ['documentNumber'],
    },
  )
  .refine(
    (data) => {
      const age = dayjs(new Date()).diff(data.birthdate, 'years');
      return !(data.type === 'PARTICIPANTE' && age > 30);
    },
    {
      message: 'Idade máxima de participante é de 30 anos',
      path: ['birthdate'],
    },
  )
  .refine(
    (data) => {
      const age = dayjs(new Date()).diff(data.birthdate, 'years');
      return !(data.type === 'PARTICIPANTE' && age < 14);
    },
    {
      message: 'Idade mínima de participante é de 14 anos',
      path: ['birthdate'],
    },
  );

export function NewRegistrationForm() {
  const EVENT_ID = String(process.env.NEXT_PUBLIC_EVENT_ID);

  const steps = [
    {
      title: 'Dados pessoais',
      description: 'Informações para o cadastro',
    },
    {
      title: 'Dados de endereço',
      description: 'Informações de onde você mora',
    },
    {
      title: 'Dados para o evento',
      description: 'Informações relevantes para o evento',
    },
    {
      title: 'Dados de pagamento',
      description: 'Informações de pagamento',
    },
  ];

  const { activeStep, setActiveStep, goToPrevious, goToNext } = useSteps({
    index: 0,
    count: steps.length,
  });

  const { register, handleSubmit, formState, reset, watch } =
    useForm<SignInFormData>({
      resolver: zodResolver(FormSchema),
    });
  const { errors } = formState;
  const documentType = watch('documentType');

  const hasError = useMemo(() => {
    for (const key in errors) {
      let keyTyped = key as keyof FieldErrors<SignInFormData>;
      if (!!errors[keyTyped]) {
        return errors[keyTyped];
      }
    }
    return undefined;
  }, [errors]);

  const handleRegister: SubmitHandler<SignInFormData> = (data) => {
    console.log('data', data);
    const formData = jsonToFormData({
      ...data,
      eventId: EVENT_ID,
    });

    registerUserParticipantsServices()
      .create(formData)
      .then(() => {
        toast.success('Inscrição realizada com sucesso');
        reset();
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 409) {
          toast.warn('Email já cadastrado neste evento');
        } else if (err.response?.status === 404) {
          toast.warn(
            'Problemas nos dados do evento. Entre em contato com os administradores',
          );
        } else {
          toast.warn(
            'Não foi possível realizar a inscrição, tente novamente mais tarde',
          );
        }
      });
  };

  function renderButtons() {
    const isLastStep = activeStep === steps.length - 1;
    console.log('activeStep', activeStep);
    console.log('steps.length', steps.length);
    return (
      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <Button
            size="lg"
            isLoading={false}
            color="white"
            colorScheme="gray"
            bgColor="gray.300"
            borderRadius="full"
            onClick={goToPrevious}
          >
            VOLTAR
          </Button>
          <Button
            type={isLastStep ? 'submit' : 'button'}
            bgColor="green.200"
            color="gray.50"
            colorScheme="green"
            size="lg"
            isLoading={formState.isSubmitting}
            disabled={formState.isSubmitting}
            borderRadius="full"
            onClick={isLastStep ? undefined : goToNext}
          >
            {isLastStep ? 'FINALIZAR' : 'AVANÇAR'}
          </Button>
        </HStack>
      </Flex>
    );
  }

  return (
    <Flex
      bg="white"
      direction="column"
      align="center"
      justify="center"
      id="inscricao"
    >
      <Image
        src="/assets/formulario-inscricao.png"
        alt="Acamps Beach Formulario Logo"
        w={['10rem', '20rem']}
        m="2rem"
      />
      <VStack>
        <Stepper index={activeStep} colorScheme="green">
          {steps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        <VStack>
          <Text fontWeight="bold">{steps[activeStep].title}</Text>
          <Text>{steps[activeStep].description}</Text>
        </VStack>
      </VStack>

      <Flex
        as="form"
        // maxWidth={400}
        justifySelf="center"
        align="center"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleRegister)}
      >
        <Stack spacing="4">
          {/**Dados pessoais */}
          <Box minW={300} w={[300, 400, 500]} hidden={!(activeStep === 0)}>
            <Input
              label="NOME COMPLETO"
              placeholder="Ex.: Mária de Santana dos Santos"
              {...register('fullName')}
              error={errors.fullName}
            />
            <Input
              type="email"
              placeholder="maria@email.com"
              label="DIGITE SEU E-MAIL PARA LOGIN"
              {...register('email')}
              error={errors.email}
            />
            <InputMasked
              label="TELEFONE PARA CONTATO"
              placeholder="Ex.: (88) 99999-9999"
              {...register('phoneNumber')}
              error={errors.phoneNumber}
              mask="(99) 99999-9999"
            />
            <Input
              type="date"
              label="SUA DATA DE NASCIMENTO"
              {...register('birthdate')}
              error={errors.birthdate}
            />
            <Radio
              label="TIPO DE DOCUMENTO"
              {...register('documentType')}
              error={errors.documentType}
              options={[
                { value: 'CPF', label: 'CPF' },
                { value: 'RG', label: 'RG' },
              ]}
            />
            <InputMasked
              // type="number"
              label="NÚMERO DO DOCUMENTO"
              placeholder="123.456.789-10"
              {...register('documentNumber')}
              error={errors.documentNumber}
              mask={documentType === 'CPF' ? '999.999.999-99' : ''}
            />

            <Input
              label="SE MENOR DE IDADE, NOME DO RESPONSÁVEL"
              placeholder="Ex.: Ana Santana dos Santos"
              {...register('guardianName')}
              error={errors.guardianName}
            />

            <InputMasked
              label="SE MENOR DE IDADE, NÚMERO DO RESPONSÁVEL"
              placeholder="Ex.: (88) 99999-9999"
              {...register('guardianPhoneNumber')}
              error={errors.guardianPhoneNumber}
              mask="(99) 99999-9999"
            />
          </Box>

          {/**Dados de endereço */}
          <Box minW={300} w={[300, 400, 500]} hidden={!(activeStep === 1)}>
            <Input
              label="CEP"
              placeholder="Ex.: 62000-000"
              {...register('zipCode')}
              error={errors.zipCode}
            />
            <Input
              label="NOME DA RUA"
              placeholder="Ex.: Rua X"
              {...register('street')}
              error={errors.street}
            />
            <Input
              label="NÚMERO DA RESIDENCIA"
              placeholder="Ex.: 123"
              {...register('streetNumber')}
              error={errors.streetNumber}
            />
            <Input
              label="COMPLEMENTO"
              placeholder="Ex.: Apto 101, bloco 1"
              {...register('complement')}
              error={errors.complement}
            />
            <Input
              label="BAIRRO"
              placeholder="Ex.: Centro"
              {...register('district')}
              error={errors.district}
            />
            <Input
              label="CIDADE"
              placeholder="Ex.: Sobral"
              {...register('city')}
              error={errors.city}
            />
            <Input
              label="ESTADO"
              placeholder="Ex.: CE"
              {...register('state')}
              error={errors.state}
            />
          </Box>

          {/**Dados para evento */}
          <Box minW={300} w={[300, 400, 500]} hidden={!(activeStep === 2)}>
            <Input
              label="QUE NOME VOCÊ DESEJA QUE APAREÇA NA CREDENCIAL?"
              placeholder="Ex.: Maria das Graças"
              {...register('credentialName')}
              error={errors.credentialName}
            />
            <Input
              label="SE PARTICIPA DA OBRA SHALOM, NOME DO GRUPO DE ORAÇÃO"
              placeholder="Ex.: Agapiméni Kardiá"
              {...register('prayerGroup')}
              error={errors.prayerGroup}
            />

            <Radio
              label="VOCÊ É MEMBRO DA COMUNIDADE VIDA OU ALIANÇA?"
              {...register('communityType')}
              error={errors.communityType}
              options={[
                { value: '', label: 'NÃO SOU' },
                { value: 'VIDA', label: 'COM. VIDA' },
                { value: 'ALIANÇA', label: 'COM. ALIANÇA' },
              ]}
            />
            <Radio
              label="VOCÊ DESEJA SE INSCREVER COMO?"
              {...register('type')}
              error={errors.type}
              options={[
                { value: 'SERVO', label: 'SERVO' },
                { value: 'PARTICIPANTE', label: 'PARTICIPANTE' },
              ]}
            />

            <Input
              label="VOCÊ É ALÉRGICO A ALGUMA COMIDA OU REMÉDIO?"
              {...register('allergyDescription')}
              placeholder="Se sim, qual?"
              error={errors.allergyDescription}
            />

            <Input
              label="VOCÊ É PORTADOR DE ALGUMA DEFICIÊNCIA?"
              placeholder="Se sim, qual?"
              {...register('pcdDescription')}
              error={errors.pcdDescription}
            />

            <Input
              label="VOCÊ NECESSITA TOMAR ALGUM MEDICAMENTO CONTROLADO?"
              placeholder="Se sim, qual?"
              {...register('medicationUseDescription')}
              error={errors.medicationUseDescription}
            />

            <Radio
              label="VOCÊ IRÁ DE TRANSPORTE PRÓPRIO PARA O LOCAL DO EVENTO?"
              {...register('transportationMode')}
              error={errors.transportationMode}
              options={[
                { value: 'TRANSPORTE PRÓPRIO', label: 'TRANSPORTE PRÓPRIO' },
                { value: 'ÔNIBUS', label: 'ÔNIBUS' },
              ]}
            />

            <Input
              label="COMO VOCÊ FICOU SABENDO DO ACAMP'S?"
              placeholder="Nos conte como..."
              {...register('eventSource')}
              error={errors.eventSource}
            />

            <Radio
              label="VOCÊ JÁ PARTICIPOU DE ALGUM ACAMP'S?"
              {...register('hasParticipatedPreviously')}
              error={errors.hasParticipatedPreviously}
              options={[
                { value: 'true', label: 'SIM' },
                { value: '', label: 'NÃO' },
              ]}
            />
          </Box>

          {/**Dados de pagamento */}
          <Box minW={300} w={[300, 400, 600]} hidden={!(activeStep === 3)}>
            <Stack spacing="10" direction={['column', 'row']}>
              <VStack spacing="5">
                <Text fontWeight="bold">INSCRIÇÃO ONLINE (1º Lote)</Text>
                <Box mb="1rem">
                  <Text fontWeight="medium">
                    Pague via PIX, dinheiro ou depósito:
                  </Text>
                  <Box>
                    <Text>Participantes: R$ 320,00</Text>
                    <Text>Servos: R$ 220,00</Text>
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
              </VStack>

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
                  {...register('paymentMethod')}
                  error={errors.paymentMethod}
                  options={[
                    { value: 'PIX', label: 'PIX' },
                    { value: 'DINHEIRO', label: 'Dinheiro' },
                    // {
                    //   value: 'CARTÃO DE DÉBITO',
                    //   label: 'Cartão de débito',
                    // },
                    {
                      value: 'CARTÃO DE CRÉDITO',
                      label: 'Cartão de crédito',
                    },
                  ]}
                />
              </Stack>
            </Stack>

            <br />
            <br />
            {/* <Box>
              <Text fontWeight="medium">
                Pague em até 3X no cartão (haverá cobrança de taxa)
              </Text>
              <Link
                target="_blank"
                href="https://link.ton.com.br/?id=2b33cc91-9eeb-4c16-a400-450e302f7c4f"
              >
                <Text color="blue" textDecoration="underline" mb="10px">
                  R$ 319,80 - Pagar no cartão (Participantes)
                </Text>
              </Link>
              <Link
                target="_blank"
                href="https://link.ton.com.br/?id=d67302ce-f1c7-43e6-a13d-9be794710263"
              >
                <Text color="blue" textDecoration="underline">
                  R$ 234,52 - Pagar no cartão (Servos)
                </Text>
              </Link>
            </Box> */}
            <br />
            <br />

            <FormLabel>DOCUMENTOS NECESSÁRIOS:</FormLabel>
            <Text>
              ATENÇÃO! Baixe, assine e nos envie esses documentos para validar
              sua inscrição.
            </Text>
            <Link
              target="_blank"
              href="/documents/autorizacao_imagem_maior_sobral.pdf"
            >
              <Text color="blue" textDecoration="underline">
                Termo de uso de imagem (maior)
              </Text>
            </Link>

            <Link
              target="_blank"
              href="/documents/autorizacao_imagem_menor_sobral.pdf"
            >
              <Text color="blue" textDecoration="underline">
                Termo de uso de imagem (menor)
              </Text>
            </Link>

            <Link
              target="_blank"
              href="/documents/termo_de_consentimento_menor_shalom.pdf"
            >
              <Text color="blue" textDecoration="underline">
                Termo de consentimento dos pais (menor)
              </Text>
            </Link>

            <Checkbox
              label="LI E ACEITO OS TERMOS E CONDIÇÕES DESCRITOS NOS DOCUMENTOS ACIMA"
              {...register('acceptedTheTerms')}
              error={errors.acceptedTheTerms}
            />

            {!!hasError && (
              <Text color="red" fontWeight="bold">
                {hasError?.message || ''}
              </Text>
            )}
          </Box>
        </Stack>
        {renderButtons()}
      </Flex>
      <Text fontWeight="bold" fontSize="lg" align="center" color="red">
        ATENÇÃO! Não fazemos reembolso
      </Text>
      <Text mb="10" px="10" align="center">
        <strong>ATENÇÃO:</strong> A idade Mínima para inscrição de participante
        é de 14 anos e a Máxima é de 30 anos.
      </Text>
    </Flex>
  );
}
