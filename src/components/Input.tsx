/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-children-prop */
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
} from '@chakra-ui/core';
import { useState } from 'react';

interface Props extends ChakraInputProps {
  leftIconInput?: string;
  leftOnClick?: ((event: React.MouseEvent<any, MouseEvent>) => void) &
    ((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void);
  rightIconInput?: string;
  rightOnClick?: ((event: React.MouseEvent<any, MouseEvent>) => void) &
    ((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void);
}

const Input: React.FC<Props> = ({
  leftIconInput,
  leftOnClick,
  rightIconInput,
  rightOnClick,
  placeholder,
  value,
  type,
  onChange,
  ...rest
}) => {
  const [isOnFocus, setOnFocus] = useState(false);

  return (
    <InputGroup alignItems="center" justifyContent="center" {...rest}>
      {leftIconInput && (
        <InputLeftElement
          children={
            <Icon
              alignSelf="center"
              name={leftIconInput}
              color={isOnFocus ? 'orange.800' : 'gray.500'}
              marginTop="2"
              size="16px"
            />
          }
          alignItems="center"
          onClick={leftOnClick}
        />
      )}
      <ChakraInput
        height="50px"
        backgroundColor="gray.600"
        focusBorderColor="orange.800"
        borderRadius="sm"
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      {rightIconInput && (
        <InputRightElement
          children={
            <Icon
              alignSelf="center"
              name={rightIconInput}
              color={isOnFocus ? 'orange.800' : 'gray.500'}
              marginTop="2"
              size="16px"
            />
          }
          onClick={rightOnClick}
          alignItems="center"
        />
      )}
    </InputGroup>
  );
};

export default Input;
