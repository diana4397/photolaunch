import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton.component";
import {ImageContainer} from "../../components/ImageContainer/ImageContainer.component";
import {Input} from "../../components/Input/Input.component";

import { LaunchFormContainer } from "./LaunchForm.styles";
import { Typography, PageMainContainer } from "../LandingPage/LandingPage.styles";
import { UserContext } from "../../contexts/userContext";

const LaunchForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [email, setEmail] = useState("");
    let navigate = useNavigate();
    const userData = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('form submitted:');
        const isValid = validateDetails();
        if(isValid) {
            userData.setFirstName(firstName);
            userData.setLastName(lastName);
            userData.setAddress1(address1);
            userData.setAddress2(address2);
            userData.setCity(city);
            userData.setState(state);
            userData.setZipCode(zipCode);
            userData.setEmail(email);
            navigate('/payment-form');
        }
    }

    const validateDetails = () =>{
        let isValid = false;
        if(firstName && lastName && address1 && city && state && zipCode && (email && validateEmail())){
            isValid = true;
        }
        return isValid;
    }

    const validateEmail = () => {
        const emailRegex = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        );
        return emailRegex.test(email);        
    }

    const handleFirstNameChange = event => {
        const { value } = event.target;
        setFirstName(value);
    };
    const handleLastNameChange = event => {
        const { value } = event.target;
        setLastName(value);
    };
    const handleAddress1Change = event => {
        const { value } = event.target;
        setAddress1(value)
    };
    const handleAddress2Change = event => {
        const { value } = event.target;
        setAddress2(value);
    };
    const handleCityChange = event => {
        const { value } = event.target;
        setCity(value);
    };
    const handleStateChange = event => {
        const { value } = event.target;
        setState(value);

    };
    const handleZipCodeChange = event => {
        const { value } = event.target;
        setZipCode(value);
    };
    const handleEmailChange = event => {
        const { value } = event.target;
        setEmail(value);
    };



    return (
        <PageMainContainer>
            <ImageContainer isBackButton/>
            <LaunchFormContainer>
                <div className="form-container">
                    <Typography>
                        Sign up below.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div><span>First Name</span>
                            <Input required type='text' onChange={handleFirstNameChange} label='First name' name='firstname' value={firstName} />
                        </div>
                        <div><span>Last Name</span>
                            <Input required type='text' onChange={handleLastNameChange} label='Last name' name='lastname' value={lastName} />
                        </div>
                        <div className="address1"><span>Address 1</span>
                            <Input required type='text' onChange={handleAddress1Change} label='Address 1' name='address1' value={address1} />
                        </div>
                        <div className="address2"><span>Address 2</span>
                            <Input  type='text' onChange={handleAddress2Change} label='Adress 2' name='address2' value={address2} />
                        </div>
                        <div><span>City</span>
                            <Input required type='text' label='City' onChange={handleCityChange} name='city' value={city} />
                        </div>
                        <div><span>State</span>
                            <Input required type='text' label='State' onChange={handleStateChange} name='state' value={state} />
                        </div>
                        <div><span>Zip Code</span>
                            <Input required type='number' label='zipcode' onChange={handleZipCodeChange} name='zipcode' value={zipCode} />
                        </div>

                        <div><span>Email</span>
                            <Input type='email' required label='Email' onChange={handleEmailChange} value={email} />
                        </div>

                        {/* <CustomButton type='submit' > UPLOAD PHOTO </CustomButton> */}
                        <CustomButton  type='submit'  > NEXT </CustomButton>
                    </form>
                </div>
            </LaunchFormContainer>
        </PageMainContainer>
    )
}

export default LaunchForm;