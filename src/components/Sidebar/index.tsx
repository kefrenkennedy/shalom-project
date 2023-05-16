import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useSidebarDrawer } from '@/hooks/sidebar';

import { SideBarNav } from './SideBarNav';

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer();
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <Drawer
        isOpen={isOpen}
        colorScheme="red"
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent bg="gray.100" p="4">
            <DrawerCloseButton mt="6" color="gray.400" />
            <DrawerHeader color="gray.400">Navegação</DrawerHeader>

            <DrawerBody>
              <SideBarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="8" bg="gray.50">
      <SideBarNav />
    </Box>
  );
}
