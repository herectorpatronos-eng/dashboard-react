import React from 'react'

const Input = ({
    required,
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    maxLength,
    mask,
    className = "",
}) => {

    const applyMask = (value, mask) => {
        if (!mask) return value;

        let maskedValue = "";
        let valueIndex = 0;

        const numbers = value.replace(/\D/g, "");

        for (
            let maskIndex = 0;
            maskIndex < mask.length && valueIndex < numbers.length;
            maskIndex++
        ) {
            if (mask[maskIndex] === "9") {
                maskedValue += numbers[valueIndex];
                valueIndex++;
            } else {
                maskedValue += mask[maskIndex];
            }
        }

        return maskedValue;
    };

    const handleChange = (e) => {
        const maskedValue = applyMask(e.target.value, mask);

        onChange({
            target: {
                name,
                value: maskedValue,
            },
        });
    };

    return (
        <input
            required={required}
            maxLength={maxLength}
            type={type}
            value={value}
            onChange={handleChange}
            name={name}
            placeholder={placeholder}
            className={`
                mt-1 block w-full rounded-lg border border-gray-300 bg-white
                text-gray-900 placeholder-gray-400 px-3 py-2 shadow-sm
                transition-colors
                dark:border-gray-600 dark:bg-gray-800 dark:text-white
                dark:placeholder-gray-400 dark:[color-scheme:dark]
                ${className}
            `}
        />
    );
};

export default Input;