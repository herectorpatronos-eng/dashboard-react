import React from 'react'
import { NavLink } from 'react-router-dom'

const SidebarItem = ({
    to,
    icon: Icon,
    label
}) => {
    return (
        <NavLink to={to} className={
            ({ isActive }) =>
                `
                flex 
                gap-2 
                py-2
                items-center
                justify-start 
                text-gray-800 
                dark:text-gray-50
                px-2
                rounded-md
                font-semibold
                ${isActive ? 'bg-emerald-200 dark:bg-emerald-800' : ''}
        `}>
            <Icon className="text-xl" />
            <span>{label}</span>
        </NavLink>
    )
}

export default SidebarItem
