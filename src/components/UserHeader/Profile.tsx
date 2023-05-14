import { useMemo } from 'react';

import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

import { useAuth } from '@/hooks/auth';

import { OptionsPopover } from './OptionsPopover';

interface IProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: IProfileProps) {
  const { user } = useAuth();

  const name = useMemo(() => {
    return user?.name?.split(' ')[0] || 'Username';
  }, [user]);

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{name}</Text>
          <Text color="gray.300" fontSize="small">
            {user?.email || 'E-mail'}
          </Text>
        </Box>
      )}

      <OptionsPopover>
        <Avatar as="button" size="md" name={name} bg="orange" />
      </OptionsPopover>
    </Flex>
  );
}
