import styled from 'styled-components';

export const PageMainContainer = styled.div`
margin: 20px;
display: flex;
align-items: center;
height: 100vh;
flex-wrap: wrap;
justify-content: center;
`;

export const LandingPageImageLogoContainer = styled.div`
margin-top: 12.5%;
`;

export const Typography = styled.p`
color: #ffffff;
font-size: 36px
`;

export const CustomButtonContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
min-height: 120px;
flex-wrap: wrap;
`;

export const UserInputContaier = styled.div`
// max-width: 50%;
// margin-left: 50%;
// margin-top: 12.5%;
// margin-right: 40px;
padding: 0 15px;
max-width: 60%;
display: flex;
justify-content: flex-end;

    @media (max-width: 992px) {
        max-width: 100%;
    }

    .description-wrp{
        width: 70%;

        @media (max-width: 992px) {
            width: 100%;
        }
    }

`;

export const LogosContainer = styled.div`
padding: 20px;
`;

export const MicroPetsLogo = styled.img`
background-image: ${({ imageUrl }) => `url(${imageUrl})`};
width: 50%;
margin: 10px;
`;

export const CelestisLogo = styled.div`
background-image: ${({ imageUrl }) => `url(${imageUrl})`};
width: 50%;
margin: 10px;
`;

export const GraphicText = styled.div`
background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;
export const GraphicTextContainer = styled.div`
width: 100%;
`;