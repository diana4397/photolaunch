import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CustomButton from "../../components/CustomButton/CustomButton.component";
import { 
        PageMainContainer, 
         Typography, 
         UserInputContaier,
         CustomButtonContainer, 
        }
from "./LandingPage.styles";
import { ImageContainer } from "../../components/ImageContainer/ImageContainer.component";
import { RemoveCookie } from '../../service/helper';


export const LandingPage = () => {
    let navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("userData");
        RemoveCookie('token');
    }, []);

    return (
        <PageMainContainer>
            <ImageContainer />
            <UserInputContaier>
                <div className="description-wrp">
                    <Typography>
                        Be part of an nft mosaic <br /> that will last for all time.
                    </Typography>
                    <Typography>
                        We are sending photographs and art out of the atmosphere and into space
                        -- and beyond. We'd love to have you join us on this journey into the cosmos. Click
                        the button below to get on board!
                    </Typography>
                    <CustomButtonContainer>
                        <CustomButton onClick={() => { navigate('/launch-form') }} > RESERVE YOUR SPACE </CustomButton>
                        <CustomButton onClick={() => { navigate('/partnered-school') }} > PARTNERED SCHOOL? </CustomButton>
                    </CustomButtonContainer>
                </div>
            </UserInputContaier>
        </PageMainContainer>
    )
}


