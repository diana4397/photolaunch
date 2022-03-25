import React, { useContext, useState } from "react";
import DataTable from 'react-data-table-component';
import { SchoolDashboardContainer } from "./SchoolDashboard.styles";
import { SchoolContext } from '../../contexts/schoolContext';
import { CustomButton } from "../CustomButton/CustomButton.component";
import { AddSchoolForm } from "../AddSchoolForm/AddSchoolForm.component";

export const SchoolDashboard = () => {
    const [addSchoolForm, setAddSchoolForm] = useState(false);
    const schoolData = useContext(SchoolContext);
    const columns = [
        {
            name: 'School Name',
            selector: row => row.schoolName,
        },
        {
            name: 'Address1',
            selector: row => row.address1,
        },
        {
            name: 'Address2',
            selector: row => row.address2,
        },
        {
            name: 'City',
            selector: row => row.city,
        },
        {
            name: 'State',
            selector: row => row.state,
        },
        {
            name: 'Zip',
            selector: row => row.zip,
        },
        {
            name: 'Contact Name',
            selector: row => row.contactName,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Code',
            selector: row => row.code,
        },
    ];
    const data = schoolData.schoolList;

    const schoolFormOpen = () => {
        setAddSchoolForm(true);
    }

    return(
        <SchoolDashboardContainer>
            {!addSchoolForm ?
            <>
                <CustomButton onClick={schoolFormOpen} className="btn-add-school" type='button'>Add School</CustomButton>
                <DataTable
                    columns={columns}
                    data={data}
                />
            </> : 
            <AddSchoolForm />}
        </SchoolDashboardContainer>
    )
}