import { Flex, Text } from '@chakra-ui/react';

import { useAuth } from '@/hooks/auth';

export function Logo() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMINISTRATOR';

  return (
    <Flex direction="column">
      {isAdmin && (
        <Text
          fontSize={isAdmin ? ['md', 'xl'] : ['2xl', '3xl']}
          fontWeight="bold"
          letterSpacing="tight"
          w={['30', '64']}
        >
          Administrativo
        </Text>
      )}
      <Text
        fontSize={isAdmin ? ['md', 'xl'] : ['2xl', '3xl']}
        fontWeight="bold"
        letterSpacing="tight"
        w={['30', '64']}
      >
        Eventos SH
        <Text as="span" ml="1" color="yellow.400">
          .
        </Text>
      </Text>
    </Flex>
  );
}
