import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { BsFacebook, BsInstagram } from "react-icons/bs";

import shalomLogo from "../../../public/assets/icone1.png";
import juventudeJesusLogo from "../../../public/assets/icone2.png";

export function Footer() {
  return (
    <>
      <Flex
        textDecoration="underline"
        w="100%"
        display="flex"
        justifyContent="space-between"
              alignItems="center"
              px="3rem"
        bgColor="yellow.400"
        color="white"
        h="70px"
      >
        <Flex justifyContent="space-between" alignItems="center" w="230px">
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

          <Link
            href="https://www.instagram.com/juventudeshsobral/"
            target="_blank"
          >
            <Text fontWeight="medium">@JUVENTUDESHSOBRAL</Text>
          </Link>
        </Flex>

        <Flex justifyContent="space-between" alignItems="center" w="190px">
          <Image src={shalomLogo.src} alt="Logo Shalom" w="80px" />
          <Image src={juventudeJesusLogo.src} alt="Juventude" w="80px" />
        </Flex>
      </Flex>
    </>
  );
}
