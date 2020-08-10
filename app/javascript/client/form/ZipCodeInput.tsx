import React, { ChangeEvent, useState, useEffect } from 'react';
import { TextInput } from './TextInput';

interface ZipCodeInputProps {
    value: string | null;
    onChange: (val: string | null) => void;
}

export const ZipCodeInput = React.forwardRef(({ onChange, value, ...rest}: ZipCodeInputProps, ref) => {
    const unmaskValue = (v: string) => v.replace(/[^\d]/g, '');
    const maskValue = (v: string) => unmaskValue(v).replace(/(\d{5})(\d{4})/, '$1-$2');
    const [zipCodeInputValue, setZipCodeInputValue] = useState(value ? maskValue(value) : '');

    useEffect(() => {
        value && setZipCodeInputValue(maskValue(value));
    }, [value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const valToUpdate = newValue ? unmaskValue(newValue) : null;

        onChange(valToUpdate);
        setZipCodeInputValue(maskValue(newValue));
    };

    return (
        <TextInput 
            {...rest}
            value={zipCodeInputValue}
            onChange={handleChange}
            inputMode="numeric"
            ref={ref}
            minLength={5}
            maxLength={9}
        />
    );
});
