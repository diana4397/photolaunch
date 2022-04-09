import React from "react";
import { SuccessPageContainer } from "./SuccessPage.styles"
import { TwitterShareButton, FacebookShareButton, FacebookIcon, TwitterIcon, PinterestShareButton, PinterestIcon} from "react-share";
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
                <div className="fb-wrp">
                    <FacebookShareButton
                        url="https://photolaunchs.s3.amazonaws.com/Sample-jpg-image-100kb.jpg"
                        quote="Check out this picture I just signed up to launch into deep space!!!"
                        hashtag="MicroPets"
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                </div>
                <div className="twitter-wrp">
                    <TwitterShareButton
                        url="https://photolaunchs.s3.amazonaws.com/Sample-jpg-image-100kb.jpg"
                        title="Check out this picture I just signed up to launch into deep space!!!"
                        className="Demo__some-network__share-button"
                        hashtags={["MicroPets"]}
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                </div>
                <div className="pinterest-wrp">
                    <PinterestShareButton
                        url={String(window.location)}
                        media='https://photolaunchs.s3.amazonaws.com/Sample-jpg-image-100kb.jpg'
                        className="Demo__some-network__share-button"
                    >
                        <PinterestIcon size={32} round />
                    </PinterestShareButton>
                </div>
                <button className="upload-button" type='submit' onClick={uploadPhoto} > Upload Another Photo </button>
            </div>
            <button className="home upload-button" onClick={gotohome}  > Home </button>
        </SuccessPageContainer>
    )
}

export default SuccessPage;