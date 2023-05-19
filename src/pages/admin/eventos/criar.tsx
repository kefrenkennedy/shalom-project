import { Box, Divider, Flex, Heading } from '@chakra-ui/react';

import { EventForm } from '@/components/forms/composites/EventForm';
import { Sidebar } from '@/components/Sidebar';
import { UserHeader } from '@/components/UserHeader';

export default function CreateEvent() {
  return (
    <Box>
      <UserHeader />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box w="100%">
          <Heading size="lg" fontWeight="normal">
            Criar evento
          </Heading>

          <Divider my="6" borderColor="gray.200" />
          <EventForm />
        </Box>
      </Flex>
    </Box>
  );
}
