import { FieldProps, ErrorMessage } from 'formik';
import React from 'react';
import styled from 'styled-components';

interface WithFormikProps {
    label: string;
    onChange?: (newVal: any) => any;
    innerRef?: React.RefObject<HTMLInputElement>;
}

const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
    margin-top: 15px;
`;

// export const withFormik = 