import styled from 'styled-components';

export const StripeFormContainer = styled.div`

    .form-group {
        margin: 0 0 20px;
        padding: 0;
        border-style: none;
        background-color: rgba(107, 0, 155, 0.6);
        will-change: opacity, transform;
        // box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #ccc;
        border-radius: 4px;

        .form-row {
            // display: -ms-flexbox;
            // display: flex;
            // -ms-flex-align: center;
            // align-items: center;
            margin-left: 15px;
            // border-top: 1px solid #ccc;
        }
    }

    .result {
        margin-top: 50px;
        text-align: center;
        animation: fade 200ms ease-out;

        .result-title {
            color: #fff;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 20px;
            text-align: center;
        }

        .result-message {
            color: #fff;
            font-size: 16px;
            line-height: 1.6em;
            text-align: center;
        }
    }

    .submit-button {
        display: block;
        font-size: 16px;
        background-color: #eeeeee;
        box-shadow: inset -7px -6px 46px -11px rgba(0,0,0,0.67);
        border-radius: 15px;
        color: #000;
        font-weight: 600;
        cursor: pointer;
        padding: 10px 20px;
        width: 50%;
        margin: auto;
        margin-top: 20px;

        &:disabled {
            opacity: 0.5;
            cursor: default;
            background-color: #ededed;
            box-shadow: none;
        }
    }

    .error-message{
        color: #fff;
        // position: absolute;
        display: flex;
        align-items: center;
        // justify-content: center;
        // padding: 0 15px;
        font-size: 16px;
        margin-top: 0px;
        width: 100%;
        // transform: translateY(-15px);
        // opacity: 0;
        // animation: fade 150ms ease-out;
        // animation-delay: 50ms;
        // animation-fill-mode: forwards;
        // will-change: opacity, transform;

        svg {
            margin-right: 10px;
        }
    }

`;
