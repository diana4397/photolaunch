import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginContainer, LoginFormContainer } from './Login.styles';
import { Typography } from '../LandingPage/LandingPage.styles';
import { Input } from '../../components/Input/Input.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';

export const Login = () => {
    let navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/dashboard');
    }
    return (
        <LoginContainer>
            <div className="login-form">
                <Typography>
                    Login below
                </Typography>
                <LoginFormContainer>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <span>Email</span>
                            <Input required type='text' label='Email' name='email' />
                        </div>
                        <div>
                            <span>Password</span>
                            <Input required type='text' label='Password' name='password' />
                        </div>
                        <CustomButton type='submit'> Login </CustomButton>
                    </form>
                </LoginFormContainer>
            </div>
        </LoginContainer>
    )
}