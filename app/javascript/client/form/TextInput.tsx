import React, { HTMLProps } from 'react';
import styled from 'styled-components';

interface TextInputProps extends Omit<HTMLProps<HTMLInputElement>, 'as' | 'ref' | 'autoComplete'> {
    alignRight?: boolean;
}

const StyledTextInput = styled.input`
    line-height: 150%;
    text-align: ${({ alignRight }: TextInputProps) => (alignRight ? 'right' : 'left')};
`;

export const TextInput = React.forwardRef(( { ...rest }: TextInputProps, ref) => (
    <StyledTextInput {...rest} ref={ref as React.RefObject<HTMLInputElement>} />
));
