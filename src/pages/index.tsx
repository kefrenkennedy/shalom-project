import React from 'react';

import { Flex, Image, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';

import { Carousel } from '@/components/Carousel';
import { Footer } from '@/components/Footer';
import { NewRegistrationForm } from '@/components/forms/composites/NewRegistrationForm';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/auth';

import acampsBeachFooterImage from '../../public/assets/acamps-beach-footer.webp';
import acampsBeachImage from '../../public/assets/acamps-beach-header.png';
import lotesImage from '../../public/assets/lotes.webp';

export default function Home() {
  const { user } = useAuth();

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

      <NewRegistrationForm />

      <Footer />
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
