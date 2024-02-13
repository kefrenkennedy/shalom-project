import { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { TicketsContainer } from '@/components/containers/TicketsContainer';
import { AddressForm } from '@/components/forms/composites/AddressForm';
import { EventForm } from '@/components/forms/composites/EventForm';
import { Sidebar } from '@/components/Sidebar';
import { UserHeader } from '@/components/UserHeader';
import { eventsServices } from '@/services/eventsServices';

export default function EditEvent() {
  const router = useRouter();
  const { eventId } = router.query;

  const [eventData, setEventData] = useState();

  useEffect(() => {
    if (eventId) {
      eventsServices()
        .show(String(eventId))
        .then((response) => setEventData(response.event));
    }
  }, [eventId]);

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
              {/* <Tab>Endereço</Tab> */}
              <Tab>Lotes</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {eventData && <EventForm event={eventData} />}
              </TabPanel>
              {/* <TabPanel>
                <AddressForm />
              </TabPanel> */}
              <TabPanel>
                <TicketsContainer />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Box>
  );
}
