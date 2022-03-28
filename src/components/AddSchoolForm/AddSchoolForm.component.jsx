import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import CustomButton from "../../components/CustomButton/CustomButton.component";
import {Input} from "../../components/Input/Input.component";
import { Typography } from "../../screens/LandingPage/LandingPage.styles";
import { SchoolContext } from "../../contexts/schoolContext";
import { AddSchoolFormContainer } from "./AddSchoolForm.styles";
import "react-datepicker/dist/react-datepicker.css";

export const AddSchoolForm = () => {
    const [schoolData, setSchoolData] = useState({
        schoolName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        contactName: '',
        email: '',
        startDate: '',
        endDate: '',
    });
    const [code, setCode] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false);
    const schoolObj = useContext(SchoolContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validateDetails();
        console.log(isValid);
        if(isValid) {
            const randomCode = generateCode();
            setCode(randomCode);
            setBtnDisabled(true);
            const {schoolName, address1, address2, city, state, zip, contactName, email} = schoolData;
            const newSchoolObj = {
                id: schoolObj.schoolList.length,
                schoolName,
                address1,
                address2,
                city,
                state,
                zip,
                contactName,
                email,
                code: randomCode,
            }
            schoolObj.setSchoolList(prevState => ([...prevState, newSchoolObj]));
            setSchoolData({
                schoolName: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
                contactName: '',
                email: '',
            })
        }
    }

    const generateCode = () => {
        return Math.random().toString(36).substr(2, 6);
    }

    const validateDetails = () =>{
        let isValid = false;
        const {schoolName, address1, city, state, zip, contactName, email} = schoolData;
        if(schoolName && address1 && city && state && zip && contactName && (email && validateEmail())){
            isValid = true;
        }
        return isValid;
    }

    const validateEmail = () => {
        const emailRegex = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        );
        return emailRegex.test(schoolData.email);        
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
                        <Input required type='text' onChange={handleInputChange} label='School name' name='schoolName' value={schoolData.schoolName} />
                    </div>
                    <div className="address1"><span>Street Address1</span>
                        <Input required type='text' onChange={handleInputChange} label='Street Address1' name='address1' value={schoolData.address1} />
                    </div>
                    <div className="address2"><span>Street Address2</span>
                        <Input type='text' onChange={handleInputChange} label='Street Address2' name='address2' value={schoolData.address2} />
                    </div>
                    <div><span>City</span>
                        <Input required type='text' label='City' onChange={handleInputChange} name='city' value={schoolData.city} />
                    </div>
                    <div><span>State</span>
                        <Input required type='text' label='State' onChange={handleInputChange} name='state' value={schoolData.state} />
                    </div>
                    <div className="start-date"><span>Start Date</span>
                        <DatePicker
                            selected={schoolData.startDate}
                            onChange={(date) => handleDateChange(date, 'startDate')}
                            customInput={<Input />}
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div className="end-date"><span>End Date</span>
                        <DatePicker
                            selected={schoolData.endDate}
                            disabled={!schoolData.startDate}
                            minDate={schoolData.startDate}
                            onChange={(date) => handleDateChange(date, 'endDate')}
                            customInput={<Input />}
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div><span>Zip Code</span>
                        <Input required type='number' label='zipcode' onChange={handleInputChange} name='zip' value={schoolData.zip} />
                    </div>
                    <div className="contact-name"><span>Contact Name</span>
                        <Input required type='text' label='Contact Name' onChange={handleInputChange} name='contactName' value={schoolData.contactName} />
                    </div>
                    <div><span>Contact Email</span>
                        <Input type='email' required label='Email' name='email' onChange={handleInputChange} value={schoolData.email} />
                    </div>
                    <CustomButton disabled={btnDisabled}  type='submit'> Generate Code </CustomButton>
                </form>
            </div>
            {code && <span className="code-txt">YOUR GENERATED CODE IS {code}</span>}
        </AddSchoolFormContainer>
    )
}