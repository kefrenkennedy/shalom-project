import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ForwardRefRenderFunction, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import InputMask from "react-input-mask";

interface InputMaskProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  mask: string;
}

const InputMaskBase: ForwardRefRenderFunction<HTMLInputElement, InputMaskProps> = (
  { name, label, error, mask, ...rest }: InputMaskProps,
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputMask mask={mask} {...rest}>
        {(inputProps) => (
          <ChakraInput
            {...inputProps}
            id={name}
            name={name}
            borderColor="gray.900"
            borderRadius="full"
            focusBorderColor="green.200"
            bgColor="gray.50"
            variant="filled"
            _hover={{
              bgColor: "gray.50",
            }}
            size="lg"
            ref={ref}
          />
        )}
      </InputMask>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputMasked = forwardRef(InputMaskBase);