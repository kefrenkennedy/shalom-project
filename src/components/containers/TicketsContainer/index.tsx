import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';

import { Box, Button, Icon, SimpleGrid, VStack } from '@chakra-ui/react';

import { TicketCard } from '@/components/cards/TicketCard';

export function TicketsContainer() {
  const [tickets, setTickets] = useState([]);

  return (
    <VStack>
      <Box w="100%">
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          mt="2rem"
        >
          <TicketCard />

          <Button width="100%" height="100%">
            <Icon as={RiAddLine} fontSize="5rem" color="gray.600" />
          </Button>
        </SimpleGrid>
      </Box>
    </VStack>
  );
}
