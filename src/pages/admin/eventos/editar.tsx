import { useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { TicketCard } from '@/components/cards/TicketCard';
import { AddressForm } from '@/components/forms/composites/AddressForm';
import { EventForm } from '@/components/forms/composites/EventForm';
import { Sidebar } from '@/components/Sidebar';
import { UserHeader } from '@/components/UserHeader';
import { eventsServices } from '@/services/eventsServices';

export default function EditEvent() {
  const router = useRouter();
  const { event_id } = router.query;

  const [eventData, setEventData] = useState();

  useEffect(() => {
    if (event_id) {
      eventsServices()
        .show(String(event_id))
        .then((response) => setEventData(response.event));
    }
  }, [event_id]);

  return (
    <Box>
      <UserHeader />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Flex direction="column" w="100%">
          <Heading size="lg" fontWeight="normal">
            Editar evento
          </Heading>

          <Tabs isFitted variant="soft-rounded" colorScheme="green" mt="10">
            <TabList>
              <Tab>Evento</Tab>
              <Tab>Endereço</Tab>
              <Tab>Lotes</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {eventData && <EventForm event={eventData} />}
              </TabPanel>
              <TabPanel>
                <AddressForm />
              </TabPanel>
              <TabPanel>
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
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Box>
  );
}
