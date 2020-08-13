import React, { HTMLProps } from 'react';
import styled from 'styled-components';

interface NumberInputProps extends Omit<HTMLProps<HTMLInputElement>, 'as' | 'ref' | 'autoComplete'> {
    alignRight?: boolean;
}

const StyledNumberInput = styled.input`
    line-height: 150%;
    text-align: ${({ alignRight }: NumberInputProps) => (alignRight ? 'right' : 'left')};
`;

export const NumberInput = React.forwardRef(( { ...rest }: NumberInputProps, ref) => (
    <StyledNumberInput {...rest} ref={ref as React.RefObject<HTMLInputElement>} type="number" min="1" max="3000" />
));
