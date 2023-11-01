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
import dayjs from 'dayjs';
import Link from 'next/link';
import { z } from 'zod';

import { Checkbox } from '@/components/forms/atomics/Checkbox';
import { Input } from '@/components/forms/atomics/Input';
import { InputMasked } from '@/components/forms/atomics/InputMasked';
import { Radio } from '@/components/forms/atomics/Radio';
import { registerUserParticipantsServices } from '@/services/registerUserParticipantsServices';
import { jsonToFormData } from '@/utils/jsonToFormData';
import { shalomQRCode } from '@/utils/shalomQRcode';

import { InputFile } from '../../atomics/InputFile';

type SignInFormData = {
  full_name: string;
  email: string;
  phone_number: string;
  birthdate: Date;
  document_type: string;
  document_number: string;
  guardian_name?: string;
  guardian_phone_number?: string;
  prayer_group?: string;
  community_type?: string;
  pcd_description?: string;
  allergy_description?: string;
  medication_use_description?: string;

  street: string;
  street_number: string;
  complement: string;
  zip_code: string;
  district: string;
  city: string;
  state: string;

  // event_id: string;
  event_source?: string;
  credential_name: string;
  transportation_mode: string;
  accepted_the_terms: boolean;
  has_participated_previously: boolean;
  type: string;

  payment_method: string;
  price: string;
  file: string;
};

const FormSchema = z
  .object({
    full_name: z.string().min(5, 'Nome muito curto'),
    email: z.string().email('E-mail inválido'),
    phone_number: z
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
    document_type: z.enum(['CPF', 'RG'], {
      invalid_type_error: 'Selecione um tipo de documento',
      required_error: 'Documento obrigatório',
    }),
    document_number: z
      .string()
      .min(7, 'Documento inválido')
      .transform((val) => val.replace(/_/g, '')),
    guardian_name: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    guardian_phone_number: z
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
    prayer_group: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    community_type: z
      .enum(['VIDA', 'ALIANÇA', ''])
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    pcd_description: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    allergy_description: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    medication_use_description: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),

    street: z.string().nonempty('Rua obrigatória'),
    street_number: z.string().nonempty('Número da rua obrigatória'),
    complement: z.string(),
    zip_code: z
      .string()
      // .regex(/^\d{5}-\d{3}$/, 'CEP inválido')
      .nonempty('CEP obrigatório'),
    district: z.string().nonempty('Bairro obrigatório'),
    city: z.string().nonempty('Cidade obrigatória'),
    state: z.string().nonempty('Estado obrigatória'),

    credential_name: z
      .string()
      .min(5, 'Nome para credencial muito curto')
      .max(18, 'Nome para credencial muito grande'),
    event_source: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    transportation_mode: z.enum(['TRANSPORTE PRÓPRIO', 'ÔNIBUS'], {
      required_error: 'Meio de Transporte obrigatório',
      invalid_type_error: 'Selecione uma opção de transporte',
    }),
    type: z.enum(['SERVO', 'PARTICIPANTE']),
    has_participated_previously: z.coerce.boolean(),
    accepted_the_terms: z
      .boolean({ required_error: 'Campo obrigatório' })
      .refine(
        (value) => value === true,
        'Você deve aceitar os termos para finalizar',
      ),

    payment_method: z.string().nonempty('Método de pagamento obrigatório'),
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
      data.document_type === 'CPF' ? cpf.isValid(data.document_number) : true,
    {
      message: 'CPF inválido',
      path: ['document_number'],
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
  const documentType = watch('document_type');

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
      event_id: EVENT_ID,
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
    <Flex bg="white" direction="column" align="center" justify="center">
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
              {...register('full_name')}
              error={errors.full_name}
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
              {...register('phone_number')}
              error={errors.phone_number}
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
              {...register('document_type')}
              error={errors.document_type}
              options={[
                { value: 'CPF', label: 'CPF' },
                { value: 'RG', label: 'RG' },
              ]}
            />
            <InputMasked
              // type="number"
              label="NÚMERO DO DOCUMENTO"
              placeholder="123.456.789-10"
              {...register('document_number')}
              error={errors.document_number}
              mask={documentType === 'CPF' ? '999.999.999-99' : ''}
            />

            <Input
              label="SE MENOR DE IDADE, NOME DO RESPONSÁVEL"
              placeholder="Ex.: Ana Santana dos Santos"
              {...register('guardian_name')}
              error={errors.guardian_name}
            />

            <InputMasked
              label="SE MENOR DE IDADE, NÚMERO DO RESPONSÁVEL"
              placeholder="Ex.: (88) 99999-9999"
              {...register('guardian_phone_number')}
              error={errors.guardian_phone_number}
              mask="(99) 99999-9999"
            />
          </Box>

          {/**Dados de endereço */}
          <Box minW={300} w={[300, 400, 500]} hidden={!(activeStep === 1)}>
            <Input
              label="CEP"
              placeholder="Ex.: 62000-000"
              {...register('zip_code')}
              error={errors.zip_code}
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
              {...register('street_number')}
              error={errors.street_number}
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
              {...register('credential_name')}
              error={errors.credential_name}
            />
            <Input
              label="SE PARTICIPA DA OBRA SHALOM, NOME DO GRUPO DE ORAÇÃO"
              placeholder="Ex.: Agapiméni Kardiá"
              {...register('prayer_group')}
              error={errors.prayer_group}
            />

            <Radio
              label="VOCÊ É MEMBRO DA COMUNIDADE VIDA OU ALIANÇA?"
              {...register('community_type')}
              error={errors.community_type}
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
              {...register('allergy_description')}
              placeholder="Se sim, qual?"
              error={errors.allergy_description}
            />

            <Input
              label="VOCÊ É PORTADOR DE ALGUMA DEFICIÊNCIA?"
              placeholder="Se sim, qual?"
              {...register('pcd_description')}
              error={errors.pcd_description}
            />

            <Input
              label="VOCÊ NECESSITA TOMAR ALGUM MEDICAMENTO CONTROLADO?"
              placeholder="Se sim, qual?"
              {...register('medication_use_description')}
              error={errors.medication_use_description}
            />

            <Radio
              label="VOCÊ IRÁ DE TRANSPORTE PRÓPRIO PARA O LOCAL DO EVENTO?"
              {...register('transportation_mode')}
              error={errors.transportation_mode}
              options={[
                { value: 'TRANSPORTE PRÓPRIO', label: 'TRANSPORTE PRÓPRIO' },
                { value: 'ÔNIBUS', label: 'ÔNIBUS' },
              ]}
            />

            <Input
              label="COMO VOCÊ FICOU SABENDO DO ACAMP'S?"
              placeholder="Nos conte como..."
              {...register('event_source')}
              error={errors.event_source}
            />

            <Radio
              label="VOCÊ JÁ PARTICIPOU DE ALGUM ACAMP'S?"
              {...register('has_participated_previously')}
              error={errors.has_participated_previously}
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
                <Text fontWeight="bold">INSCRIÇÃO ONLINE (2º Lote)</Text>
                <Box mb="1rem">
                  <Text fontWeight="medium">
                    Pague via PIX, dinheiro ou depósito:
                  </Text>
                  <Box>
                    <Text>Participantes: R$ 230,00</Text>
                    <Text>Servos: R$ 160,00</Text>
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
            </Stack>

            <br />
            <br />
            <Box>
              <Text fontWeight="medium">Pague em até 3X no cartão (haverá cobrança de taxa)</Text>
              <Link
                target="_blank"
                href="https://link.ton.com.br/?id=ea822021-1eec-43e6-b27a-5fd26b8f0142"
              >
                <Text color="blue" textDecoration="underline" mb="10px">
                  R$ 259,27 - Pagar no cartão (Participantes)
                </Text>
              </Link>
              <Link
                target="_blank"
                href="https://link.ton.com.br/?id=503f932b-433b-4b19-8edf-03f0beaae5eb"
              >
                <Text color="blue" textDecoration="underline">
                  R$ 180,36 - Pagar no cartão (Servos)
                </Text>
              </Link>
            </Box>
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
              {...register('accepted_the_terms')}
              error={errors.accepted_the_terms}
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
      <Text mb="10" px="10" align="center">
        <strong>ATENÇÃO:</strong> A idade Mínima para inscrição de participante
        é de 14 anos e a Máxima é de 30 anos.
      </Text>
    </Flex>
  );
}
