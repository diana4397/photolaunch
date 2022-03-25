import styled from 'styled-components';

export const PartneredSchoolFormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    flex-direction: column;
    margin: 20px;

    .btn-back {
        position: absolute;
        top: 10px;
		left: 30px;
    }

    .login-form{
        width: 40%;
        padding: 30px;
        background-color: rgba(107,0,155,0.6);
        border-radius: 15px;

        @media screen and (max-width: 992px) {
            width: 60%;
        }
        @media screen and (max-width: 650px) {
            width: 100%;
        }

    }
`;

export const FormContainer = styled.div`
    form{
        display: flex;
        flex-direction: column;

        div {
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
        }

        button {
            margin-top: 15px;
            @media screen and (max-width: 576px) {
                font-size: 14px;
                padding: 0 10px;
            }
        }

    }    
`;