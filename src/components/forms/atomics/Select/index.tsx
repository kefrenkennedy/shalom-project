import { forwardRef, ForwardRefRenderFunction } from 'react';

import {
  FormControl,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/react';

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, options, ...rest }: SelectProps,
  ref,
) => {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraSelect id={name} name={name} ref={ref} {...rest}>
        {options?.map((data) => (
          <option key={data.value} value={data.value}>
            {data.label}
          </option>
        ))}
      </ChakraSelect>
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
