import React, { useEffect, useState } from "react";
import Checkbox from '../Checkbox/Checkbox.component';
import { UserDashboardContainer, DashboardImagesContainer } from "./UserDashboard.styles";
import { CustomButton } from "../CustomButton/CustomButton.component";
import {UploadedImages} from '../../service/api';

export const UserDashboard = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function getImages() {
            const {data: {data}} = await UploadedImages(page);
            setUploadedImages(data);
        }
        getImages();
    }, [page]);

    return(
        <UserDashboardContainer>
            {!uploadedImages.length ? <h1 className="text-center">No Image Found!</h1> :
                <>
                    <DashboardImagesContainer>
                        {uploadedImages.map(img => (
                            <div className="img-card">
                                <img src={img.image} alt={img} />
                                <Checkbox  
                                />
                            </div>
                        ))}
                    </DashboardImagesContainer>
                    <div className="btn-wrp">
                        <CustomButton  type='button'> Batch Reject </CustomButton>
                        <CustomButton  type='button'> Confirm Selection </CustomButton>
                    </div>
                </>
            }
        </UserDashboardContainer>
    )
}