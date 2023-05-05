import { Box, Flex } from "@chakra-ui/react";

export default function Header() {
  return (
    <>
      <Flex
        textDecoration="underline"
        w="100%"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        backgroundColor="rgba(255, 34, 0, 1)"
        color="white"
        h="70px"
      >
        <Box cursor="pointer">Login</Box>
        <Box cursor="pointer">Sobre o Evento</Box>
        <Box cursor="pointer">Contatos</Box>
      </Flex>
    </>
  );
}
