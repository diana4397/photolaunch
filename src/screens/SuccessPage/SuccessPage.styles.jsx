import styled from 'styled-components';

export const SuccessPageContainer = styled.div`
    max-width: 60%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    margin: auto;
    justify-content: center;
    .pStyle{
        font-size: 20px;
        font-weight: 700;
    }

    .share{
        display: flex;
        align-items: center;

        .fb-wrp, .twitter-wrp {
            margin-right: 15px;
        }
    }
    .upload-button{
        font-size: 16px;
        background-color: #eeeeee;
        box-shadow: inset -7px -6px 46px -11px rgb(0 0 0 / 67%);
        border-radius: 15px;
        color: #000;
        font-weight: 600;
        cursor: pointer;
        padding: 10px 20px;
        margin : 10px 0;
    }
    .home{
        display: block;
        width: 30%;
    }
`