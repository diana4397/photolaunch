import React from "react";
import { useLocation } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar/Sidebar.component';
import UserDashboard from '../../components/UserDashboard/UserDashboard.component';
import { SchoolDashboard } from '../../components/SchoolDashboard/SchoolDashboard.component';
import { AdminContainer } from './AdminDashboard.styles';
import { SchoolProvider } from '../../contexts/schoolContext';

export const AdminDashboard = () => {
    const location = useLocation();
    const pathName = location.pathname;
    return (
        <AdminContainer>
            <Sidebar pathName={pathName} />
            <SchoolProvider>
                {pathName === '/dashboard' ? <UserDashboard/> : <SchoolDashboard />}
            </SchoolProvider>
        </AdminContainer>
    )
}