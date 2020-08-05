import React, { HTMLProps } from 'react';
import styled from 'styled-components';

interface NumberInputProps extends Omit<HTMLProps<HTMLInputElement>, 'as' | 'ref' | 'autoComplete'> {
}

const StyledNumberInput = styled.input`
`;

export const NumberInput = React.forwardRef(( { ...rest }: NumberInputProps, ref) => (
    <StyledNumberInput {...rest} ref={ref as React.RefObject<HTMLInputElement>} type="number" min="1" max="9999" />
));
