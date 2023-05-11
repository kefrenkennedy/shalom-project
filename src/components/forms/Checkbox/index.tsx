import { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import {
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';

interface CheckboxProps extends ChakraCheckboxProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const CheckboxBase: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = ({ name, label, error, ...rest }: CheckboxProps, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      <ChakraCheckbox
        id={name}
        name={name}
        borderRadius="full"
        colorScheme="green"
        size="lg"
        ref={ref}
        {...rest}
      >
        {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      </ChakraCheckbox>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Checkbox = forwardRef(CheckboxBase);
