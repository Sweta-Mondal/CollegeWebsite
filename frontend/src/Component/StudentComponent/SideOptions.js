import React, { useState } from 'react';
import Sidebar from './SideBar';


const SideOptions = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <button className={`sidebar-toggle ${isSidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}>
                &#x2022;&#x2022;&#x2022;
            </button>
            <Sidebar isOpen={isSidebarOpen} />
        </>
    )
}

export default SideOptions
