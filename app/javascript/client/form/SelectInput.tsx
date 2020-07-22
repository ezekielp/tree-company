import React, { FC } from 'react';

interface Option {
    label: string;
    value: string;
}

interface SelectInputProps {
    options: Option[];
}

export const SelectInput: FC<SelectInputProps> = ({ options, ...rest }) => (
    <select {...rest}>
        {options.map(option => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);
