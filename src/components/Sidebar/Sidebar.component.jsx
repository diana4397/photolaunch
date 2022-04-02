import React from 'react';
import { Link } from "react-router-dom";
import { SidebarContainer } from './Sidebar.styles';
import { RemoveCookie } from '../../service/helper';

const MenuItems = [
    {
        'label': 'User Uploads',
        'link': '/dashboard'
    }, {
        'label': 'School Onboard',
        'link': '/school-onboard'
    }, {
        'label': 'Logout',
        'link': '/'
    }
]

export const Sidebar = ({ pathName }) => {
    const handleLogout = (path) => {
        if(path === '/') {
            RemoveCookie('token');
        }
    }

    return (
        <SidebarContainer>
            {MenuItems.map(item => (
                <Link onClick={() => handleLogout(item.link)} key={item.link} className={pathName === item.link ? 'active' : ''} to={item.link}>{item.label}</Link>
            ))}
        </SidebarContainer>
    )
}

export default Sidebar;
