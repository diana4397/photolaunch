import React from "react";
import { SuccessPageContainer } from "./SuccessPage.styles"
import { SocialIcon } from 'react-social-icons';
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
    let navigate = useNavigate();
    const uploadPhoto = () => {
        navigate('/payment-form');
    }
    const gotohome = () => {
        navigate('/');
    }
    return (
        <SuccessPageContainer>
            <div className="pStyle">
                <p>Thank you for joining us on our journey to space!</p>
                <p>Pending admin approval to ensure no offensive or pornographic images were uploaded, your image(s) are now scheduled for blastoff. </p>
                <p>Please be on the lookout for an email confirmation for results of the image screening process just prior to blastoff. </p>
                <p>In the meantime, feel free to share this awesome news that your image is headed to space!</p>
            </div>
            <div className="share">
                <SocialIcon network="facebook" url="https://facebook.com/" bgColor="rgb(0, 172, 237)" fgColor="#fff" style={{ margin: "10px" }} />
                <SocialIcon network="instagram" url="https://instagram.com/" fgColor="#fff" style={{ margin: "10px" }} />
                <SocialIcon network="twitter" url="https://twitter.com/" fgColor="#fff" style={{ margin: "10px" }} />
                <button className="upload-button" type='submit' onClick={uploadPhoto} > Upload Another Photo </button>
            </div>
            <button className="home upload-button" onClick={gotohome}  > Home </button>
        </SuccessPageContainer>
    )
}

export default SuccessPage