import styled from 'styled-components';

export const PaymentFormContainer = styled.div`
    padding: 30px;
    color: #ffffff;
    font-size: 26px;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: flex-start;

    @media (max-width: 767px) {
        flex-direction: column;
    }
`;

export const BillingDetailsContainer = styled.div`
    // display: flex;
    flex: 1;
    padding-left: 20px;

    @media (max-width: 767px) {
        padding-left: 0;
    }

    .billing-details{
        margin-bottom: 30px;
        .lbl-billing{
            font-size: 26px;
            margin-bottom: 10px;
        }
        .field-detail{
            font-size: 22px;
            margin: 8px 0;
            // display: flex;
            // flex-direction: column;
        }
    }
    .promo-payment-wrp{
        // flex: 1;
    }
`;