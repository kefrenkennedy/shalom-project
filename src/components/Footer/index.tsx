import { BsFacebook, BsInstagram } from 'react-icons/bs';

import { Flex, Image, Link, Text, useBreakpointValue } from '@chakra-ui/react';

export function Footer() {
  const showUserName = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Flex
      textDecoration="underline"
      w="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px="3rem"
      bgColor="yellow.400"
      color="white"
      h="5rem"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        w={['3rem', '3rem', '15rem']}
      >
        <Link
          href="https://www.facebook.com/juventudeshalom.sobral"
          target="_blank"
        >
          <BsFacebook />
        </Link>

        <Link
          href="https://www.instagram.com/juventudeshsobral/"
          target="_blank"
        >
          <BsInstagram />
        </Link>

        {showUserName && (
          <Link
            href="https://www.instagram.com/juventudeshsobral/"
            target="_blank"
          >
            <Text fontWeight="medium">@JUVENTUDESHSOBRAL</Text>
          </Link>
        )}
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" w="12rem">
        <Image src="/assets/icone1.png" alt="Logo Shalom" w="5rem" />
        <Image src="/assets/icone2.png" alt="Juventude" w="5rem" />
      </Flex>
    </Flex>
  );
}
