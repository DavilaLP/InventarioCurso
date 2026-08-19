import React, { useState } from 'react'
import "./Sidebar.scss"
import { HiMenuAlt3 } from "react-icons/hi";
import { TbCircleLetterE } from "react-icons/tb";
import menu from "../../data/sidebar"
import SidebarItem from "./SidebarItem"
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(window.innerWidth > 768)
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate()

    const closeSidebarOnMobile = () => {
        if (window.innerWidth <= 768) {
            setIsOpen(false);
        }
    };

    const goHome = () => {
       navigate("/")
    };

    return (
        <div className='layout'>
            {/* Botón flotante para pantallas pequeñas cuando el sidebar está cerrado */}
            <div className='mobile-toggle' onClick={toggle}>
                <HiMenuAlt3 size={30} />
            </div>

            <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <div className='top_section'>
                    <div className='logo'>
                        <TbCircleLetterE size={35} style={{cursor: "pointer"}} onClick={goHome}/>
                    </div>
                    <div className='bars'>
                          <HiMenuAlt3 onClick={toggle}/>
                    </div>
                </div>
                {menu.map((item, index) => {
                    return <SidebarItem key={index} item={item} isOpen={isOpen} closeSidebar={closeSidebarOnMobile} />
                })}
            </div>

            {/* Overlay para cerrar el menú lateral en dispositivos móviles */}
            {isOpen && <div className="sidebar-overlay" onClick={toggle}></div>}

            <main className={isOpen ? "sidebar-open" : "sidebar-closed"}>
                {children}
            </main>
        </div>
    )
}

export default Sidebar