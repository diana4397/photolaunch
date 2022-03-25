import styled from 'styled-components';


export const LaunchFormContainer = styled.div`
// position: fixed;
align-items: flex-end;
// margin-left: 50%;
max-width: 60%;
padding-right: 10%;
// margin-top: 12.5%;
color: #ffffff;
font-size: 26px;
display: flex;
flex-direction: column;
justify-content: center;
height: 100%;
width: 100%;

    p{
        align-self: flex-start;
    }

    form{
        align-self: flex-start;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        flex-wrap: wrap;

        div{
            display: flex;
            flex-direction: column;
            span{
                font-size: 18px;
            }
        }
        .address1, .address2{
            grid-column-start: 1;
            grid-column-end: 3;
        }
    }

`;

