import { useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';

import { Box, Button, Icon, SimpleGrid, VStack } from '@chakra-ui/react';

import { TicketCard } from '@/components/cards/TicketCard';
import { ticketsServices } from '@/services/ticketsServices';
import { Ticket } from '@/types/Tickets';

interface Props {
  eventId: string;
}

export function TicketsContainer({ eventId }: Props) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    if (eventId) {
      ticketsServices()
        .list({ eventId })
        .then((response) => setTickets(response.tickets));
    }
  }, [eventId]);

  return (
    <VStack>
      <Box w="100%">
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          mt="2rem"
        >
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}

          <Button width="100%" height="100%">
            <Icon as={RiAddLine} fontSize="5rem" color="gray.600" />
          </Button>
        </SimpleGrid>
      </Box>
    </VStack>
  );
}
