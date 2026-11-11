import React from 'react'
import ThemeToggle from './ThemeToggle'
import UserDropdown from './UserDropdown'

const Header = () => {

    return (
        <header className="sticky top-0 left-0 w-full bg-gray-50 dark:bg-gray-800 shadow-md px-4 py-2 flex items-center justify-between z-50">
            <div className="flex items-center gap-2">
                <img src="/src/assets/logo-dashboard.png" alt="Voltar para home" className="h-10" />
                <h1 className="text-2xl font-semibold text-gray-500 dark:text-gray-50">
                    Dashboard
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle />
                <UserDropdown />
            </div>

        </header>
    )
}

export default Header
