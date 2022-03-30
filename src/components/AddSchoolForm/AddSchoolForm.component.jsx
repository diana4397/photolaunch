import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import CustomButton from "../../components/CustomButton/CustomButton.component";
import {Input} from "../../components/Input/Input.component";
import { Typography } from "../../screens/LandingPage/LandingPage.styles";
import { SchoolContext } from "../../contexts/schoolContext";
import { AddSchoolFormContainer } from "./AddSchoolForm.styles";
import { AddSchool, UpdateSchool } from "../../service/api";
import "react-datepicker/dist/react-datepicker.css";

export const AddSchoolForm = ({schoolAdded, selectedSchool}) => {
    const [schoolData, setSchoolData] = useState({
        name: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        zip_code: '',
        contact_name: '',
        contact_email: '',
        start_date: '',
        end_date: '',
    });
    const [code, setCode] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false);
    const schoolObj = useContext(SchoolContext);

    useEffect(() => {
        if(selectedSchool)  {
            const {name, address_line_1, address_line_2, city, state, zip_code, contact_name, contact_email, start_date, end_date} = selectedSchool;
            setSchoolData({
                name,
                address_line_1,
                address_line_2,
                city,
                state,
                zip_code,
                contact_name,
                contact_email,
                start_date: new Date(start_date),
                end_date: new Date(end_date),
            })
        }
    }, [selectedSchool]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validateDetails();
        if(isValid) {
            setBtnDisabled(true);
            const {name, address_line_1, address_line_2, city, state, zip_code, contact_name, contact_email, start_date, end_date} = schoolData;
            const newSchoolObj = {
                name,
                address_line_1,
                address_line_2,
                city,
                state,
                zip_code,
                contact_name,
                contact_email,
                start_date: start_date.toISOString().slice(0, 10),
                end_date: end_date.toISOString().slice(0, 10),
            }
            if(!selectedSchool?._id) {
                const {data: {data}} = await AddSchool(newSchoolObj);
                newSchoolObj.code = data.code;
                newSchoolObj._id = data._id;
                setCode(data.code);
                schoolObj.setSchoolList(prevState => ([...prevState, newSchoolObj]));
            }
            else{
                newSchoolObj._id = selectedSchool._id;
                const {status} = await UpdateSchool(newSchoolObj);
                newSchoolObj.code = selectedSchool.code;
                if(status === 200) {
                    const index = schoolObj.schoolList.findIndex(school => school._id === selectedSchool._id);
                    if(index > -1){
                        schoolObj.setSchoolList(prevState => {
                            prevState[index] = newSchoolObj;
                            return prevState;
                        });
                    }
                }
            }
            setSchoolData({
                name: '',
                address_line_1: '',
                address_line_2: '',
                city: '',
                state: '',
                zip_code: '',
                contact_name: '',
                contact_email: '',
                start_date: '',
                end_date: '',
            })
            setTimeout(() => {
                schoolAdded();
            }, 3000);
        }
    }

    const validateDetails = () =>{
        let isValid = false;
        const {name, address_line_1, city, state, zip_code, contact_name, contact_email, start_date, end_date } = schoolData;
        if(name && address_line_1 && city && state && zip_code && contact_name && start_date && end_date && (contact_email && validateEmail())){
            isValid = true;
        }
        return isValid;
    }

    const validateEmail = () => {
        const emailRegex = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        );
        return emailRegex.test(schoolData.contact_email);        
    }

    const handleInputChange = (event) => {
        const { value, name } = event.target;
        setSchoolData(prevState => ({...prevState, [name]: value}));
    }

    const handleDateChange = (date, name) => {
        setSchoolData(prevState => ({...prevState, [name]: date}));
    }

    return (
        <AddSchoolFormContainer>
            <div className="form-container">
                <Typography>
                    Generate School Code
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div className="school-name"><span>School Name</span>
                        <Input required type='text' onChange={handleInputChange} label='School name' name='name' value={schoolData.name} />
                    </div>
                    <div className="address1"><span>Street Address1</span>
                        <Input required type='text' onChange={handleInputChange} label='Street Address1' name='address_line_1' value={schoolData.address_line_1} />
                    </div>
                    <div className="address2"><span>Street Address2</span>
                        <Input type='text' onChange={handleInputChange} label='Street Address2' name='address_line_2' value={schoolData.address_line_2} />
                    </div>
                    <div><span>City</span>
                        <Input required type='text' label='City' onChange={handleInputChange} name='city' value={schoolData.city} />
                    </div>
                    <div><span>State</span>
                        <Input required type='text' label='State' onChange={handleInputChange} name='state' value={schoolData.state} />
                    </div>
                    <div className="start-date"><span>Start Date</span>
                        <DatePicker
                            selected={schoolData.start_date}
                            onChange={(date) => handleDateChange(date, 'start_date')}
                            customInput={<Input />}
                            dateFormat="yyyy-MM-dd"
                            minDate={new Date()}
                        />
                    </div>
                    <div className="end-date"><span>End Date</span>
                        <DatePicker
                            selected={schoolData.end_date}
                            disabled={!schoolData.start_date}
                            minDate={schoolData.start_date}
                            onChange={(date) => handleDateChange(date, 'end_date')}
                            customInput={<Input />}
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div><span>Zip Code</span>
                        <Input required type='number' label='zipcode' onChange={handleInputChange} name='zip_code' value={schoolData.zip_code} />
                    </div>
                    <div className="contact-name"><span>Contact Name</span>
                        <Input required type='text' label='Contact Name' onChange={handleInputChange} name='contact_name' value={schoolData.contact_name} />
                    </div>
                    <div><span>Contact Email</span>
                        <Input type='email' required label='Email' name='contact_email' onChange={handleInputChange} value={schoolData.contact_email} disabled={selectedSchool?._id} />
                    </div>
                    <CustomButton disabled={btnDisabled}  type='submit'> {selectedSchool?._id ? 'Update School' : 'Generate Code'} </CustomButton>
                </form>
            </div>
            {code && <span className="code-txt">YOUR GENERATED CODE IS {code}</span>}
        </AddSchoolFormContainer>
    )
}