import {
  Checkbox as ChakraCheckbox,
  FormLabel,
  FormControl,
  CheckboxProps as ChakraCheckboxProps,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ForwardRefRenderFunction, RefAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

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
