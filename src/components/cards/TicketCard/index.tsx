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

import { Ticket } from '@/types/Tickets';
import { dayjs } from '@/utils/dayjs';
import { numberToCurrency } from '@/utils/numberToCurrency';

interface Props {
  ticket: Ticket;
}

export function TicketCard({ ticket }: Props) {
  const nullDate = '--/--/----';

  const startDate = ticket.startsAt
    ? dayjs(ticket.startsAt).format('DD/MM/YYYY')
    : nullDate;

  const endDate = ticket.expiresAt
    ? dayjs(ticket.expiresAt).format('DD/MM/YYYY')
    : nullDate;

  return (
    <Card size="sm">
      <CardHeader>
        <Heading size="md">{ticket.title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Preço: {numberToCurrency(ticket.price)}</Text>
        <br />
        <Text>Início: {startDate}</Text>
        <Text>Expiração: {endDate}</Text>
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
