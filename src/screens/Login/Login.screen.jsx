import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { LoginContainer, LoginFormContainer } from './Login.styles';
import { Typography } from '../LandingPage/LandingPage.styles';
import { Input } from '../../components/Input/Input.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';
import { AdminLogin } from '../../service/api';
import { SetCookie, GetCookie } from '../../service/helper';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    let navigate = useNavigate();

    useEffect(() => {
        const token = GetCookie('token');
        if(token) navigate('/dashboard');
    }, [navigate]);

    const handleInputChange = (event) => {
        const { value, name } = event.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {data: {data}} = await AdminLogin(formData);
        SetCookie('token', data._id);
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
                            <Input required type='text' label='Email' onChange={handleInputChange} name='email' value={formData.email} />
                        </div>
                        <div>
                            <span>Password</span>
                            <Input required type='password' label='Password' onChange={handleInputChange} name='password' value={formData.password} />
                        </div>
                        <CustomButton type='submit'> Login </CustomButton>
                    </form>
                </LoginFormContainer>
            </div>
        </LoginContainer>
    )
}