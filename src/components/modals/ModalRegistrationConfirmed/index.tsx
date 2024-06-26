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
                onClick={handleOpenParticipantLink}
                colorScheme="green"
                leftIcon={<RiWhatsappLine />}
              >
                Participantes
              </Button>
              <Button
                onClick={handleOpenServantLink}
                colorScheme="yellow"
                color="white"
                leftIcon={<RiWhatsappLine />}
              >
                Servos
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  function handleOpenParticipantLink() {
    const participantUrl = 'https://chat.whatsapp.com/E86yx3zd5Ue8X7EdBvWfsD';
    window.open(participantUrl, '_blank');
  }

  function handleOpenServantLink() {
    const servantUrl = 'https://chat.whatsapp.com/JxOldQVBSnlH9xsnceoa16';
    window.open(servantUrl, '_blank');
  }
}
