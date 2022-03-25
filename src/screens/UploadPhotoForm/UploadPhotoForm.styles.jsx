import styled from 'styled-components';


export const PhotoUploadFormContainer = styled.div`
// align-items: flex-end;
// margin-top: 12.5%;
color: #ffffff;
font-size: 26px;
display: flex;
flex-direction: column;
// justify-content: center;
height: 100%;
width: 100%;
flex: 1;

    .price-info {
        padding: 8px;
        margin-bottom: 10px;
        background: white;
        color: black;
        border-radius: 10px;
        text-align: center;
    }

    .error-text {
        font-size: 18px;
        color: red;
        margin-bottom: 15px;
        text-align: right;
    }
`;

export const StyledDiv = styled.div`
    padding: 0 20px;
    border: 3px dashed #fff;
    background-color: rgba(107,0,155,0.6);
    border-radius: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin-bottom: 20px;
    position: relative;
    height: 40vh;

    &.upload-err{
        border-color: red;
        color: red;
    }

    .drag-drop-file-wrp{
        text-align: center;
        font-weight: 600;
        .cloud-upload-icon{
            width: 50px;
            height: 50px;
        }
        .btn-select-file{
            padding: 5px 10px;
            margin-top: 10px;
            border-radius: 5px;
            border: none;
            background: #007bff;
            color: #fff;
        }
    }
`;

export const MediaPreview = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    overflow: auto;

    .thumbnail-preview{
        width: 100px;
        height: 100px;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid #fff;
        position: relative;

        &:hover {
            .remove-icon {
                display: block;
            }
        }

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .remove-icon{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: none;

            span {
                position: absolute;
                top: 50%;
                left: 50%;
                height: 40px;
                width: 40px;
                border-radius: 100%;
                text-align: center;
                transform: translate(-50%, -50%);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                border-radius: 100%;
                background-color: red;
                cursor: pointer;
            }

        }
    }
`;