import styled from 'styled-components';

export const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    flex-direction: column;
    padding: 0 30px;

    .login-form{
        width: 30%;
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

export const LoginFormContainer = styled.div`
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
        }

    }    

`;