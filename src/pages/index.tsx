import Header from '@/components/header';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  VStack,
} from '@chakra-ui/react';
import AcampsBeach from '../assets/AcampsBeach.png';
import AcampsBeachFooter from '../assets/AcampsBeachFooter.png';
import carrossel1 from '../assets/Carrossel1.jpg';
import carrossel2 from '../assets/Carrossel2.jpg';
import carrossel3 from '../assets/Carrossel3.jpg';
import carrossel4 from '../assets/Carrossel4.jpg';
import carrossel5 from '../assets/Carrossel5.jpg';
import Footer from '../assets/Footer.png';
import FormularioDeInscrição from '../assets/FormularioDeInscrição.png';
import Lotes from '../assets/Lotes.png';
import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  nomeCompleto: z.string().nonempty(),
  idade: z.number().int().min(1).max(150),
  telefone: z.string().pattern(/^\d{10}$/),
  nomeResponsavel: z.string().optional(),
  numeroResponsavel: z.string().optional(),
  grupoOração: z.string().optional(),
  participaShalom: z.boolean().optional(),
  alergias: z.string().optional(),
  email: z.string().email(),
  senha: z.string().min(8),
  formaPagamento: z.enum(['dinheiro', 'pix', 'cartao de credito/debito']),
});

class DemoCarousel extends Component {
  render() {
    return (
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div>
          <Image src={carrossel1.src} alt="image" h="350px" />
        </div>
        <div>
          <Image src={carrossel2.src} alt="image" h="350px" />
        </div>
        <div>
          <Image src={carrossel3.src} alt="image" h="350px" />
        </div>
        <div>
          <Image src={carrossel4.src} alt="image" h="350px" />
        </div>
        <div>
          <Image src={carrossel5.src} alt="image" h="350px" />
        </div>
      </Carousel>
    );
  }
}

const { register, handleSubmit, formState } = useForm({
  resolver: zodResolver(schema),
  mode: 'onBlur',
});

const { errors } = formState;

const onSubmit = (data: any) => {
  console.log(data);
};

export default function Home() {
  return (
    <>
      <Header />

      <Image src={AcampsBeach.src} alt="Acamps Beach" w="100%" mb="50px" />

      <DemoCarousel />

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
        w="20%"
        ml="60px"
      />

      <form onSubmit={handleSubmit(onsubmit)}>
        <FormControl isInvalid={errors.nomeCompleto}>
          <FormLabel>NOME COMPLETO:</FormLabel>
          <Input {...register('nomeCompleto')} />
          <FormErrorMessage>
            {errors.nomeCompleto && errors.nomeCompleto.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.idade}>
          <FormLabel>SUA IDADE:</FormLabel>
          <Input type="number" {...register('idade')} />
          <FormErrorMessage>
            {errors.idade && errors.idade.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.telefone}>
          <FormLabel>TELEFONE PARA CONTATO:</FormLabel>
          <Input {...register('telefone')} />
          <FormErrorMessage>
            {errors.telefone && errors.telefone.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.nomeResponsavel}>
          <FormLabel>SE MENOR DE IDADE, NOME DO RESPONSÁVEL:</FormLabel>
          <Input {...register('nomeResponsavel')} />
          <FormErrorMessage>
            {errors.nomeResponsavel && errors.nomeResponsavel.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.numeroResponsavel}>
          <FormLabel>NÚMERO DO RESPONSÁVEL:</FormLabel>
          <Input {...register('numeroResponsavel')} />
          <FormErrorMessage>
            {errors.numeroResponsavel && errors.numeroResponsavel.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>VOCÊ PARTICIPA DA OBRA SHALOM:</FormLabel>
          <Input {...register('obraShalom')} />
          <FormErrorMessage>
            {errors.obraShalom && errors.obraShalom.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.grupoOração}>
          <FormLabel>SE SIM, QUAL O NOME DO GRUPO DE ORAÇÃO?</FormLabel>
          <Input {...register('grupoOração')} />
          <FormErrorMessage>
            {errors.grupoOração && errors.grupoOração.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.membroComunidade}>
          <FormLabel>VOCÊ É MEMBRO DA COMUNIDADE DE VIDA OU ALIANÇA?</FormLabel>
          <Input {...register('aliançaOuVida')} />
          <FormErrorMessage>
            {errors.aliançaOuVida && errors.aliançaOuVida.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.alergias}>
          <FormLabel>VOCÊ É ALÉRGICO A ALGUMA COMIDA OU REMÉDIO?</FormLabel>
          <Input {...register('alergias')} />
          <FormErrorMessage>
            {errors.alergias && errors.alergias.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.email}>
          <FormLabel>DIGITE SEU E-MAIL PARA LOGIN:</FormLabel>
          <Input type="email" {...register('email')} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.senha}>
          <FormLabel>CADASTRE UMA SENHA DE 8 DÍGITOS</FormLabel>
          <Input type="password" {...register('senha')} />
          <FormErrorMessage>
            {errors.senha && errors.senha.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.formaPagamento}>
          <FormLabel>SELECIONE A FORMA DE PAGAMENTO</FormLabel>
          <Select {...register('formaPagamento')}>
            <option value="">Selecione uma opção</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="pix">PIX</option>
            <option value="cartao de credito/debito">
              Cartão de Crédito/Débito
            </option>
          </Select>
          <FormErrorMessage>
            {errors.formaPagamento && errors.formaPagamento.message}
          </FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit">
          FINALIZAR INSCRIÇÃO
        </Button>
      </form>

      <Image src={Footer.src} alt="Acamps Beach Footer" w="100%" />
    </>
  );
}
