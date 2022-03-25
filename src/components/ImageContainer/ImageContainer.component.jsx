import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton.component";
import Logo1 from '../../assets/images/logo1.png';
import Logo2 from '../../assets/images/logo2.png';
import LaunchInto from '../../assets/images/LaunchInto.png';
import { ImagesContainer } from "./ImageContainer.styles";

export const ImageContainer = ({isBackButton}) => {
    let navigate = useNavigate();
    return(
        <ImagesContainer>
            <div className="button-logo-wrp">
                {isBackButton && <CustomButton onClick={() => navigate('/')} className="btn-back" to="/">Back</CustomButton>}
                <div className="logo-wrp">
                    <img src={Logo1} alt="logo1" />
                    <img src={Logo2} alt="logo2" />
                </div>
            </div>
            <img src={LaunchInto} alt="intro" />
        </ImagesContainer>
    )
}