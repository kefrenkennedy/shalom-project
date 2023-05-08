import React, { Component } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import Header from '@/components/Header';
import AcampsBeach from '../../public/assets/AcampsBeach.png';
import AcampsBeachFooter from '../../public/assets/AcampsBeachFooter.png';
import carrossel1 from '../../public/assets/Carrossel1.jpg';
import carrossel2 from '../../public/assets/Carrossel2.jpg';
import carrossel3 from '../../public/assets/Carrossel3.jpg';
import carrossel4 from '../../public/assets/Carrossel4.jpg';
import carrossel5 from '../../public/assets/Carrossel5.jpg';
import Footer from '../../public/assets/Footer.png';
import FormularioDeInscrição from '../../public/assets/FormularioDeInscrição.png';
import Lotes from '../../public/assets/Lotes.png';

const schema = z.object({
  nomeCompleto: z.string().nonempty(),
  idade: z.number().int().min(1).max(150),
  telefone: z.string(),
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

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  // const onSubmit: SubmitHandler<> = (data: any) => {
  //   console.log(data);
  // };

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

      <form onSubmit={() => {}}>
        <FormControl>
          <FormLabel>NOME COMPLETO:</FormLabel>
          <Input {...register('nomeCompleto')} />
        </FormControl>

        <FormControl>
          <FormLabel>SUA IDADE:</FormLabel>
          <Input type="number" {...register('idade')} />
        </FormControl>

        <FormControl>
          <FormLabel>TELEFONE PARA CONTATO:</FormLabel>
          <Input {...register('telefone')} />
        </FormControl>

        <FormControl>
          <FormLabel>SE MENOR DE IDADE, NOME DO RESPONSÁVEL:</FormLabel>
          <Input {...register('nomeResponsavel')} />
        </FormControl>

        <FormControl>
          <FormLabel>NÚMERO DO RESPONSÁVEL:</FormLabel>
          <Input {...register('numeroResponsavel')} />
        </FormControl>

        <FormControl>
          <FormLabel>VOCÊ PARTICIPA DA OBRA SHALOM:</FormLabel>
          <Input {...register('obraShalom')} />
        </FormControl>

        <FormControl>
          <FormLabel>SE SIM, QUAL O NOME DO GRUPO DE ORAÇÃO?</FormLabel>
          <Input {...register('grupoOração')} />
        </FormControl>

        <FormControl>
          <FormLabel>VOCÊ É MEMBRO DA COMUNIDADE DE VIDA OU ALIANÇA?</FormLabel>
          <Input {...register('aliançaOuVida')} />
        </FormControl>

        <FormControl>
          <FormLabel>VOCÊ É ALÉRGICO A ALGUMA COMIDA OU REMÉDIO?</FormLabel>
          <Input {...register('alergias')} />
        </FormControl>

        <FormControl>
          <FormLabel>DIGITE SEU E-MAIL PARA LOGIN:</FormLabel>
          <Input type="email" {...register('email')} />
        </FormControl>

        <FormControl>
          <FormLabel>CADASTRE UMA SENHA DE 8 DÍGITOS</FormLabel>
          <Input type="password" {...register('senha')} />
        </FormControl>

        <FormControl>
          <FormLabel>SELECIONE A FORMA DE PAGAMENTO</FormLabel>
          <Select {...register('formaPagamento')}>
            <option value="">Selecione uma opção</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="pix">PIX</option>
            <option value="cartao de credito/debito">
              Cartão de Crédito/Débito
            </option>
          </Select>
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit">
          FINALIZAR INSCRIÇÃO
        </Button>
      </form>

      <Image src={Footer.src} alt="Acamps Beach Footer" w="100%" />
    </>
  );
}
