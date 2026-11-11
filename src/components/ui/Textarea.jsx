import React from 'react';

const Textarea = ({
    required = false,
    name,
    placeholder,
    value,
    onChange,
    maxLength,
    rows = 4,
    className = "",
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
        <textarea
            required={required}
            maxLength={maxLength}
            rows={rows}
            value={value}
            onChange={handleChange}
            name={name}
            placeholder={placeholder}
            className={`
                mt-1 block w-full rounded-lg border border-gray-300 bg-white
                text-gray-900 placeholder-gray-400 px-3 py-2 shadow-sm
                transition-colors resize-none
                dark:border-gray-600 dark:bg-gray-800 dark:text-white
                dark:placeholder-gray-400 dark:[color-scheme:dark]
                ${className}
            `}
        />
    );
};

export default Textarea;