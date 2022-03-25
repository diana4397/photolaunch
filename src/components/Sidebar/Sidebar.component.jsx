import React from 'react';
import { Link } from "react-router-dom";
import { SidebarContainer } from './Sidebar.styles';


const MenuItems = [
    {
        'label': 'User Uploads',
        'link': '/dashboard'
    }, {
        'label': 'School Onboard',
        'link': '/school-onboard'
    }
]

export const Sidebar = ({ pathName }) => {
    return (
        <SidebarContainer>
            {MenuItems.map(item => (
                <Link key={item.link} className={pathName === item.link ? 'active' : ''} to={item.link}>{item.label}</Link>
            ))}
        </SidebarContainer>
    )
}

export default Sidebar;
