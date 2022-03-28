import styled from 'styled-components';

export const AddSchoolFormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .code-txt {
        font-size: 20px;
        font-weight: 700;
        margin-top: 30px;
    }

    .form-container{
        width: 50%;

        form{
            align-self: flex-start;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            flex-wrap: wrap;
            position: relative;
    
            > div{
                display: flex;
                flex-direction: column;
                span{
                    font-size: 18px;
                }
            }
            .react-datepicker__input-container{
                input {
                    width: 100%;
                }
            }
            .address1, .address2, .school-name{
                grid-column-start: 1;
                grid-column-end: 3;
            }
            .contact-name{
                grid-column-start: 1;
            }

            button {
                grid-column-start: 2;
                // position: absolute;
                // top: calc(100% + 10px);
                // left: 50%;
                // transform: translateX(-50%);
            }
        }
    }
`;