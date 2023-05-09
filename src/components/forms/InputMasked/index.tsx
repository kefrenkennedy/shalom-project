import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import InputMask from 'react-input-mask';

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
  ref
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
