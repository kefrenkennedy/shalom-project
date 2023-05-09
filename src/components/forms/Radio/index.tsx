import {
  Radio as ChakraRadio,
  RadioGroup,
  FormLabel,
  FormControl,
  RadioProps as ChakraRadioProps,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react';
import { ForwardRefRenderFunction, RefAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface RadioProps extends ChakraRadioProps {
  name: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
  error?: FieldError;
}

const RadioBase: ForwardRefRenderFunction<HTMLInputElement, RadioProps> = (
  { name, label, options, error, ...rest }: RadioProps,
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <RadioGroup id={name} name={name} size="xl">
        <Stack direction="column">
          {options.map((option) => (
            <ChakraRadio
              key={option.value}
              value={option.value}
              size="lg"
              ref={ref}
              colorScheme="green"
              {...rest}
            >
              {option.label}
            </ChakraRadio>
          ))}
        </Stack>
      </RadioGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Radio = forwardRef(RadioBase);
