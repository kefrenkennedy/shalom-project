import { ReactNode } from 'react';

import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/auth';

interface IProps {
  children?: ReactNode;
}

export function OptionsPopover({ children }: IProps) {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  return (
    <Popover returnFocusOnClose={false} placement="top" closeOnBlur={false}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent w="10rem">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Button w="100%" colorScheme="red" h="1.5rem" onClick={handleSignOut}>
            Sair
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
