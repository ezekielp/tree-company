import { FieldProps, ErrorMessage } from 'formik';
import React, { ComponentType } from 'react';
import { device } from '../media';
import styled from 'styled-components';

interface WithFormikProps {
    label: string;
    onChange?: (newVal: any) => any;
    innerRef?: React.RefObject<HTMLInputElement>;
}

const Label = styled.div`
    margin-right: 7px;
    margin-bottom: 10px;
`;

const InputWrapper = styled.div`
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    margin-right: 36px;
    ${`@media ${device.mobile}`} {
        margin-right: 0;
    }
`;

export const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
    margin-top: 15px;
`;

export const withFormik = <P extends object>(WrappedComponent: ComponentType<P>) => (
    props: FieldProps & P & WithFormikProps
) => {
    const { label, field, form, onChange, innerRef, ...rest } = props;
    const { name } = field;

    const handleOnChange = (arg: any) => {
        const newVal = arg && arg.target ? arg.target.value : arg;
        const withOnChange = onChange ? onChange(newVal) : newVal;
        form.setFieldValue(name, withOnChange);
    };

    const onBlur = () => {
        form.setFieldTouched(name, true);
    };

    return (
        <InputWrapper>
            <Label as="label" htmlFor={name}>{label}</Label>
            <WrappedComponent 
                {...(rest as P)}
                {...field}
                onChange={handleOnChange}
                onBlur={onBlur}
                ref={innerRef}
            />
            <StyledErrorMessage name={name} component="div" />
        </InputWrapper>
    );
};
