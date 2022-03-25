import React from "react";
import { useNavigate } from "react-router-dom";
import { PartneredSchoolFormContainer, FormContainer } from './PartneredSchool.styles';
import { Typography } from '../LandingPage/LandingPage.styles';
import { Input } from '../../components/Input/Input.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';

export const PartneredSchool = () => {
    let navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/');
    }
    return (
        <PartneredSchoolFormContainer>
            <CustomButton onClick={() => navigate('/')} className="btn-back" to="/">Back</CustomButton>
            <div className="login-form">
                <Typography>
                    Personal Promo Code
                </Typography>
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <span>Email Address</span>
                            <Input required type='text' label='Email' name='email' />
                        </div>
                        <div>
                            <span>School Code</span>
                            <Input required type='text' label='SchoolCode' name='schoolCode' />
                        </div>
                        <CustomButton type='submit'> Generate Promo Code </CustomButton>
                    </form>
                </FormContainer>
            </div>
        </PartneredSchoolFormContainer>
    )
}