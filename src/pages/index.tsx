import React, { Component } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Select,
  Stack,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Header from '@/components/Header';
import { Input } from '@/components/forms/Input';
import { Radio } from '@/components/forms/Radio';
import { Checkbox } from '@/components/forms/Checkbox';
import { InputMasked } from '@/components/forms/InputMasked';
import { usersService } from '@/services/usersServices';
import { useAuth } from '@/hooks/auth';
import { registrationsService } from '@/services/registrationsServices';

import AcampsBeach from '../../public/assets/AcampsBeach.png';
import AcampsBeachFooter from '../../public/assets/AcampsBeachFooter.png';
// import carrossel1 from '../../public/assets/Carrossel1.jpg';
// import carrossel2 from '../../public/assets/Carrossel2.jpg';
// import carrossel3 from '../../public/assets/Carrossel3.jpg';
// import carrossel4 from '../../public/assets/Carrossel4.jpg';
// import carrossel5 from '../../public/assets/Carrossel5.jpg';
import Footer from '../../public/assets/Footer.png';
import FormularioDeInscrição from '../../public/assets/FormularioDeInscrição.png';
import Lotes from '../../public/assets/Lotes.png';
import { toast } from 'react-toastify';
import { Carousel } from '@/components/Carousel';

type SignInFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;

  // user_id: string;
  // event_id: string;
  // full_name: string;
  phone_number: string;
  age: number;
  document_number: string;
  document_type: string;
  guardian_name?: string;
  guardian_phone_number?: string;
  prayer_group?: string;
  event_source?: string;
  community_type?: string;
  pcd_description?: string;
  allergy_description?: string;
  transportation_mode: string;
  accepted_the_terms: boolean;
};

const signInFormSchema = z
  .object({
    name: z.string().min(3, 'Nome muito curto'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(8, 'Deve conter no mínimo 8 caracteres'),
    password_confirmation: z.string(),

    // full_name: z.string().min(5),
    phone_number: z.string().min(15, 'Telefone inválido'),
    age: z.coerce
      .number({
        invalid_type_error: 'Idade inválida',
        required_error: 'Campo obrigatório',
      })
      .int('Idade inválida')
      .min(1, 'Idade inválida')
      .max(99, 'Idade inválida'),
    document_number: z.string().min(7, 'Documento inválido'),
    document_type: z.enum(['CPF', 'RG'], {
      invalid_type_error: 'Selecione uma opção',
      required_error: 'Documento obrigatório',
    }),
    guardian_name: z
      .string({ required_error: 'Campo obrigatório' })
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    guardian_phone_number: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    prayer_group: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    community_type: z
      .enum(['VIDA', 'ALIANÇA', ''])
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    event_source: z
      .string()
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
    transportation_mode: z.enum(['TRANSPORTE PRÓPRIO', 'ÔNIBUS'], {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Selecione uma opção',
    }),
    accepted_the_terms: z
      .boolean({ required_error: 'Campo obrigatório' })
      .refine((value) => value === true, {
        message: 'Você deve aceitar os termos para finalizar',
        path: ['accepted_the_terms'],
      }),
  })
  .strict()
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Senhas devem ser iguais',
    path: ['password_confirmation'],
  });

export default function Home() {
  const EVENT_ID = String(process.env.NEXT_PUBLIC_EVENT_ID);

  const { signIn, user } = useAuth();
  const { register, handleSubmit, formState, reset } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  const { errors } = formState;

  const handleRegister: SubmitHandler<SignInFormData> = async (data) => {
    /*
    // test submit
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    */

    const {
      name,
      email,
      password,
      password_confirmation,
      age,
      phone_number,
      document_number,
      document_type,
      guardian_name,
      guardian_phone_number,
      transportation_mode,
      allergy_description,
      community_type,
      prayer_group,
      event_source,
      pcd_description,
      accepted_the_terms,
    } = data;

    if (!user.id) {
      // CRIAR CONTA
      try {
        await usersService().create({
          email,
          name,
          password,
          password_confirmation,
        });
      } catch (err) {
        console.log(err);
      }

      // FAZER LOGIN
      await signIn({ email, password });
    }

    // CADASTRAR NO EVENTO
    registrationsService()
      .create(
        EVENT_ID, //TODO: PEGAR EVENTO DINAMICAMENTE
        {
          full_name: name,
          age,
          phone_number,
          document_number,
          document_type,
          guardian_name,
          guardian_phone_number,
          transportation_mode,
          allergy_description,
          community_type,
          prayer_group,
          event_source,
          pcd_description,
          accepted_the_terms,
        }
      )
      .then(() => {
        toast.success('Inscrição realizada com sucesso');
        reset();
      })
      .catch(() => {
        toast.warn(
          'Não foi possível realizar a inscrição, tente novamente mais tarde'
        );
      });
  };

  return (
    <>
      <Header />

      <Image src={AcampsBeach.src} alt="Acamps Beach" w="100%" mb="50px" />

      <Carousel />

      <Image
        src={AcampsBeachFooter.src}
        alt="Acamps Beach Info"
        w="100%"
        mt="30px"
      />

      <Image src={Lotes.src} alt="Acamps Beach Lotes" w="100%" />

      <Image
        src={FormularioDeInscrição.src}
        alt="Acamps Beach Formulario Logo"
        w="50%"
        ml="2rem"
        mt="1rem"
      />

      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.50"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleRegister)}
      >
        <Stack spacing="4">
          <Input
            label="NOME COMPLETO"
            {...register('name')}
            error={errors.name}
          />
          <Input
            type="numer"
            label="SUA IDADE"
            {...register('age')}
            error={errors.age}
          />
          <InputMasked
            label="TELEFONE PARA CONTATO"
            {...register('phone_number')}
            error={errors.phone_number}
            mask="(99) 99999-9999"
          />
          <Input
            type="number"
            label="NÚMERO DO DOCUMENTO"
            {...register('document_number')}
            error={errors.document_number}
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
          <Input
            label="SE MENOR DE IDADE, NOME DO RESPONSÁVEL"
            {...register('guardian_name')}
            error={errors.guardian_name}
          />
          <InputMasked
            label="SE MENOR DE IDADE, NÚMERO DO RESPONSÁVEL"
            {...register('guardian_phone_number')}
            error={errors.guardian_phone_number}
            mask="(99) 99999-9999"
          />
          <Input
            label="SE PARTICIPA DA OBRA SHALOM, NOME DO GRUPO DE ORAÇÃO"
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

          <Input
            label="VOCÊ É ALÉRGICO A ALGUMA COMIDA OU REMÉDIO?"
            {...register('allergy_description')}
            error={errors.allergy_description}
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
            {...register('event_source')}
            error={errors.event_source}
          />

          <Input
            type="email"
            label="DIGITE SEU E-MAIL PARA LOGIN"
            {...register('email')}
            error={errors.email}
          />
          <Input
            type="password"
            label="DIGITE UMA SENHA DE 8 DÍGITOS"
            {...register('password')}
            error={errors.password}
          />
          <Input
            type="password"
            label="DIGITE A SENHA NOVAMENTE"
            {...register('password_confirmation')}
            error={errors.password_confirmation}
          />

          <Checkbox
            label="LI E ACEITO OS TERMOS E CONDIÇÕES DESCRITOS ACIMA"
            {...register('accepted_the_terms')}
            error={errors.accepted_the_terms}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          bgColor="green.500"
          color="gray.50"
          size="lg"
          // isLoading={formState.isSubmitting}
          isLoading={false}
          borderRadius="full"
        >
          FINALIZAR INSCRIÇÃO
        </Button>
      </Flex>

      <Image src={Footer.src} alt="Acamps Beach Footer" w="100%" />
    </>
  );
}
