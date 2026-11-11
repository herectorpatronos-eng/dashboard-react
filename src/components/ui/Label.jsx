import React from 'react'

const Label = ({
    htmlFor,
    children,
    required = false,
}) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`
                block text-sm font-medium
                text-gray-700
                dark:text-gray-200
            `}
        >
            {children}
            {required && (
                <span className="ml-1 text-red-500">*</span>
            )}
        </label>
    )
}

export default Label
