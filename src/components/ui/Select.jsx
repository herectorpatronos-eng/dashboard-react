import React from 'react';

const Select = ({
    required = false,
    name,
    value,
    onChange,
    options = [],
    placeholder = 'Selecione...',
    className = '',
}) => {

    const handleChange = (e) => {
        onChange({
            target: {
                name,
                value: e.target.value,
            },
        });
    };

    return (
        <select
            required={required}
            name={name}
            value={value}
            onChange={handleChange}
            className={`
                mt-1 block w-full rounded-lg border border-gray-300 bg-white
                text-gray-900 px-3 py-2 shadow-sm
                transition-colors
                dark:border-gray-600 dark:bg-gray-800 dark:text-white
                dark:[color-scheme:dark]
                ${className}
            `}
        >
            <option value="">
                {placeholder}
            </option>

            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;