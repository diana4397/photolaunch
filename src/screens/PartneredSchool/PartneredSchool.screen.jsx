import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { PartneredSchoolFormContainer, FormContainer } from './PartneredSchool.styles';
import { Typography } from '../LandingPage/LandingPage.styles';
import { Input } from '../../components/Input/Input.component';
import { CustomButton } from '../../components/CustomButton/CustomButton.component';
import { PromoCodeGenerate } from '../../service/api';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const PartneredSchool = () => {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        schoolCode: '',
    })

    const handleInputChange = (event) => {
        const { value, name } = event.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }

    const validateDetails = () =>{
        let isValid = false;
        const {email, schoolCode} = formData;
        if(schoolCode && (email && validateEmail())){
            isValid = true;
        }
        return isValid;
    }

    const validateEmail = () => {
        const emailRegex = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        );
        return emailRegex.test(formData.email);        
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const isValid = validateDetails();
        if(isValid) {
            const {email, schoolCode} = formData;
            const req = {
                email,
                schoolCode,
            }
            try{
                const {data: {data}} = await PromoCodeGenerate(req);
                toast.success(`Promo code sent to ${data.email}`);
                setFormData({
                    email: '',
                    schoolCode: ''
                })
                setTimeout(() => {
                    navigate('/');
                }, 6000);
            }
            catch(e){
                toast.error(e.response.data.errors);
            }
        }
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
                            <Input required type='text' label='Email' name='email' onChange={handleInputChange} value={formData.email} />
                        </div>
                        <div>
                            <span>School Code</span>
                            <Input required type='text' label='SchoolCode' name='schoolCode' onChange={handleInputChange} value={formData.schoolCode} />
                        </div>
                        <CustomButton type='submit'> Generate Promo Code </CustomButton>
                    </form>
                </FormContainer>
            </div>
        </PartneredSchoolFormContainer>
    )
}