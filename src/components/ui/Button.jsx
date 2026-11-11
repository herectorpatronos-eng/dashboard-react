import React from 'react'

const Button = ({
    className = 'bg-blue-500 text-white hover:bg-blue-600',
    children,
    type = 'button',
    onClick
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                px-4 py-2
                rounded-lg
                transition-colors
                cursor-pointer
                text-md
                ${className}
            `}
        >
            {children}
        </button>
    )
}

export default Button
