import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import InputMask from 'react-input-mask';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

interface InputMaskProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  mask: string;
}

const InputMaskBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputMaskProps
> = (
  { name, label, error, mask, onChange, onBlur, ...rest }: InputMaskProps,
  ref,
) => {
  const renderInput = () => (
    <ChakraInput
      {...rest}
      id={name}
      name={name}
      borderColor="gray.900"
      borderRadius="full"
      focusBorderColor="green.200"
      bgColor="gray.50"
      variant="filled"
      _hover={{
        bgColor: 'gray.50',
      }}
      size="lg"
      ref={ref}
    />
  );

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputMask mask={mask}>
        {
          //@ts-ignore
          renderInput
        }
      </InputMask>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputMasked = forwardRef(InputMaskBase);
