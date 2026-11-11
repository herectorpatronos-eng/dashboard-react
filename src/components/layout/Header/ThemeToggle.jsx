import React from 'react'
import { PiSunDim, PiMoon } from "react-icons/pi";

const ThemeToggle = () => {

    const [theme, setTheme] = React.useState(() => {
        // Pega o valor salvo no localStorage ou light como padrão
        return localStorage.getItem("theme") || "light"
    });
    
    React.useEffect(() => {
        // Salvar tema no localStorage (navegador)
        localStorage.setItem("theme", theme)

        if (theme === "dark") {
            // Pegar tag HTML e adicionar classe "dark"
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`
                px-4 py-2 rounded-2xl hover:cursor-pointer
                ${theme === "light" ?
                    "bg-gray-500 text-gray-50" :
                    "bg-gray-50 text-gray-500"
                }
            `}
        >
            {theme === "light" ? <PiMoon /> : <PiSunDim />}
        </button>
    )
}

export default ThemeToggle
