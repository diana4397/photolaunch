import styled from 'styled-components';

export const UserDashboardContainer = styled.div`
    padding: 30px 30px 0 30px;
    flex: 1;
    .btn-wrp{
        text-align: center;
        margin: 10px 0;
        button {
            display: inline-flex;
            margin: 0 5px;
        }
    }
`;

export const DashboardImagesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;

    @media (max-width: 992px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 767px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .img-card {
        width: 100%;
        height: 100%;
        position: relative;

        img {
            width: 100%;
            height: 250px;
            object-fit: cover;
        }
        > div { 
            position: absolute; 
            bottom: 10px; 
            right: 10px;
            margin: 0;
        }
    }
`;
