import React from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { Carousel } from '@/components/Carousel';
import { Footer } from '@/components/Footer';
import { RegistrationForm } from '@/components/forms/composites/RegistrationForm';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/auth';

import acampsBeachImage from '../../public/assets/AcampsBeach.png';
import acampsBeachFooterImage from '../../public/assets/AcampsBeachFooter.png';
import lotesImage from '../../public/assets/Lotes.png';

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

      {user.role === 'ADMINISTRATOR' ? (
        <Flex align="center" justify="center" p="4rem">
          <Box w={900}>
            <Text
              fontSize="3xl"
              textAlign="center"
              fontWeight="medium"
              color="gray.500"
            >
              Você está loggado como administrador, mas apenas participantes
              podem realizar a inscrição no evento
            </Text>
          </Box>
        </Flex>
      ) : (
        <RegistrationForm />
      )}

      <Footer />
    </Flex>
  );
}
