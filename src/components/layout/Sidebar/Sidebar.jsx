import React from 'react'
import { AiOutlineDashboard } from "react-icons/ai";
import { BsFillPeopleFill, BsBuildingsFill, BsGiftFill } from "react-icons/bs";
import SidebarItem from './SidebarItem'

const Sidebar = () => {
    return (
        <aside className="w-64 h-full bg-gray-50 dark:bg-gray-800 px-4 py-10 z-40">
            <SidebarItem to="/" icon={AiOutlineDashboard} label="Dashboard" />
            <SidebarItem to="clientes" icon={BsFillPeopleFill} label="Clientes" />
            <SidebarItem to="fornecedores" icon={BsBuildingsFill} label="Fornecedores" />
            <SidebarItem to="produtos" icon={BsGiftFill} label="Produtos" />
        </aside>
    )
}

export default Sidebar
