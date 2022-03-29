import React, { useContext, useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { SchoolDashboardContainer } from "./SchoolDashboard.styles";
// import { SchoolContext } from '../../contexts/schoolContext';
import { CustomButton } from "../CustomButton/CustomButton.component";
import { AddSchoolForm } from "../AddSchoolForm/AddSchoolForm.component";
import { GetSchoolList, DeleteSchoolList } from "../../service/api";

export const SchoolDashboard = () => {
    const [addSchoolForm, setAddSchoolForm] = useState(false);
    const [schoolList, setSchoolList] = useState([]);
    const [selectedData, setSelectedData] = useState();
    // const schoolData = useContext(SchoolContext);
    
    useEffect(() => {
        (async function() {
            try {
                const schoolList = await GetSchoolList();
                const {data: {data}} = schoolList;
                setSchoolList(data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);


    const columns = [
        {
            name: 'School Name',
            selector: row => row.name,
        },
        {
            name: 'Address1',
            selector: row => row.address_line_1,
        },
        {
            name: 'Address2',
            selector: row => row.address_line_2,
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
            selector: row => row.zip_code,
        },
        {
            name: 'Contact Name',
            selector: row => row.contact_name,
        },
        {
            name: 'Email',
            selector: row => row.contact_email,
        },
        {
            name: 'Code',
            selector: row => row.code,
        },
    ];

    const schoolFormOpen = () => {
        setAddSchoolForm(true);
    }

    const handleChange = ({selectedRows}) => {
        setSelectedData(selectedRows);
    };
    
    const deleteSchool = async () => {
        const idArry = selectedData.map(({_id}) => _id);
        const { status } = await DeleteSchoolList(idArry);
        if(status === 200) {
            const remainingSchool = selectedData.filter(value => !idArry.includes(value._id));
            setSchoolList(remainingSchool);
            setSelectedData([]);
        }
    };

    return(
        <SchoolDashboardContainer>
            {!addSchoolForm ?
            <>
                <div className="btn-action-wrp">
                    <CustomButton onClick={schoolFormOpen} className="btn-add-school" type='button'>Add School</CustomButton>
                    <CustomButton onClick={deleteSchool} className="btn-add-school" type='button' disabled={!selectedData?.length}>Delete</CustomButton>
                    <CustomButton onClick={() => {}} className="btn-add-school" type='button' disabled={selectedData?.length !== 1}>Update</CustomButton>
                </div>
                <DataTable
                    columns={columns}
                    data={schoolList}
                    selectableRows
                    onSelectedRowsChange={handleChange}
                />
            </> : 
            <AddSchoolForm />}
        </SchoolDashboardContainer>
    )
}