import { useRef } from 'react';
import { RiMoneyDollarCircleLine, RiWhatsappLine } from 'react-icons/ri';

import {
  Box,
  Button,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';

import subscriptionConfirmedImage from '../../../../public/assets/subscription-confirmed-image.webp';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  type: 'SERVO' | 'PARTICIPANTE';
}

export function ModalRegistrationConfirmed({
  isOpen,
  onClose,
  onOpen,
  type,
}: Props) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inscrição Confirmada!!!🎉</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Image
                src={subscriptionConfirmedImage.src}
                alt="Imagem de inscrição confirmada"
                w="100%"
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Stack direction="row" width="100%" justify="space-between">
              <Button onClick={onClose}>Fechar</Button>
              <Button
                onClick={handleOpenLink}
                colorScheme="green"
                leftIcon={<RiWhatsappLine />}
              >
                Entrar no Grupo
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  function handleOpenLink() {
    const servantUrl = 'https://chat.whatsapp.com/JxOldQVBSnlH9xsnceoa16';
    const participantUrl = 'https://chat.whatsapp.com/E86yx3zd5Ue8X7EdBvWfsD';
    const finalUrl = type === 'PARTICIPANTE' ? participantUrl : servantUrl;
    window.open(finalUrl, '_blank');
  }
}
