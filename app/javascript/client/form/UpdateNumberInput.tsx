import React, { HTMLProps } from 'react';
import styled from 'styled-components';

interface UpdateNumberInputProps extends Omit<HTMLProps<HTMLInputElement>, 'as' | 'ref' | 'autoComplete'> {
}

const StyledNumberInput = styled.input`
    width: 50%;
`;

export const UpdateNumberInput = React.forwardRef(( { ...rest }: UpdateNumberInputProps, ref) => (
    <StyledNumberInput {...rest} ref={ref as React.RefObject<HTMLInputElement>} type="number" min="0" max="9999" />
));
