import {
  ChangeEvent,
  forwardRef,
  ForwardRefRenderFunction,
  RefAttributes,
  useState,
} from 'react';
import { FieldError } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

interface InputFileProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputFileBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputFileProps
> = ({ name, label, error, ...rest }: InputFileProps, ref) => {
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target?.files?.length > 0) {
      const file = event?.target?.files[0];
      setFileName(file.name);
    }
  };

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input
        type="file"
        accept=".jpg,.jpeg,.png"
        id={name}
        name={name}
        opacity="0"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex="1"
        color="gray.700"
        ref={ref}
        _focus={{ outline: 'none', borderBottom: '2px solid green.200' }}
        _hover={{
          cursor: 'pointer',
          borderBottom: '2px solid rgba(0, 0, 0, 0.24)',
        }}
        {...rest}
        onChange={(e) => handleFileUpload(e)}
      />

      <Input
        placeholder="Selecione um arquivo"
        value={fileName}
        readOnly
        zIndex="0"
        _placeholder={{
          color: 'gray.500',
        }}
        size="lg"
        borderRadius="full"
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputFile = forwardRef(InputFileBase);
