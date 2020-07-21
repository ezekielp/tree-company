import React, { ChangeEvent, useState } from 'react';
import { TextInput } from './TextInput';

interface PhoneNumberInputProps {
    value: string | null;
    onChange: (val: string | null) => void;
}

export const PhoneNumberInput = React.forwardRef(({ onChange, value, ...rest }: PhoneNumberInputProps, ref) => {
    const unmaskValue = (v: string) => v.replace(/[^\d]/g, '');
    const maskValue = (v: string) => unmaskValue(v).replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    const [inputValue, setInputValue] = useState(value ? maskValue(value) : '');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const valToUpdate = newValue ? unmaskValue(newValue) : null;

        onChange(valToUpdate);
        setInputValue(maskValue(newValue));
    };

    return (
        <TextInput
            {...rest}
            value={inputValue}
            onChange={handleChange}
            inputMode="numeric"
            ref={ref}
            minLength={10}
            maxLength={10}
        />
    );
});
