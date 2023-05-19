import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

export function TicketCard() {
  return (
    <Card size="sm">
      <CardHeader>
        <Heading size="md">1º Lote</Heading>
      </CardHeader>
      <CardBody>
        <Text>Preço: R$ 100,00</Text>
        <Text>Expiração: 12/02/2020</Text>
      </CardBody>
      <CardFooter justify="flex-end">
        <Stack spacing="2" direction="row">
          <Button colorScheme="red" color="white">
            Apagar
          </Button>

          <Button colorScheme="yellow" color="white">
            Editar
          </Button>
        </Stack>
      </CardFooter>
    </Card>
  );
}
