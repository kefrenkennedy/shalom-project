import React from 'react';

import { Flex, Image } from '@chakra-ui/react';

import { Carousel } from '@/components/Carousel';
import { Footer } from '@/components/Footer';
import { RegistrationForm } from '@/components/forms/composites/RegistrationForm';
import { Header } from '@/components/Header';

import acampsBeachImage from '../../public/assets/AcampsBeach.png';
import acampsBeachFooterImage from '../../public/assets/AcampsBeachFooter.png';
import lotesImage from '../../public/assets/Lotes.png';

export default function Home() {
  return (
    <Flex direction="column">
      <Header />

      <Image
        src={acampsBeachImage.src}
        alt="Acamp's Beach"
        w="100%"
        mb="50px"
      />

      <Flex p="2rem">
        <Carousel />
      </Flex>

      <Image
        src={acampsBeachFooterImage.src}
        alt="Acamps Beach Info"
        w="100%"
        mt="30px"
      />

      <Image src={lotesImage.src} alt="Acamps Beach Lotes" w="100%" />

      <RegistrationForm />

      <Footer />
    </Flex>
  );
}
