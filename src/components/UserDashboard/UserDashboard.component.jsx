import React from "react";
import Checkbox from '../Checkbox/Checkbox.component';
import { UserDashboardContainer, DashboardImagesContainer } from "./UserDashboard.styles";
import { CustomButton } from "../CustomButton/CustomButton.component";
import {UploadedImages, StatusChange} from '../../service/api';

const limit = 20;
class UserDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            uploadedImages: [],
            page: 1,
            total: 0,
        }
    }

    componentDidMount() {
        this.fetchImages();
    }

    fetchImages = async () => {
        let {data: {data, total_count}} = await UploadedImages();
        data = data.map((imgObj) => ({...imgObj, isChecked: true}));
        this.setState({
            uploadedImages: data,
            total: total_count
        })
    }

    checkBoxChange = (i) => {
        const { uploadedImages } = this.state;
        const temp = [...uploadedImages];
        const tempElement = temp[i];
        tempElement.isChecked = !tempElement.isChecked;
        temp[i] = tempElement;
        this.setState({
            uploadedImages: temp,
        })
    }

    handleStatusChange = async (operation) => {
        const { uploadedImages, total, page } = this.state;
        let checkedImages = uploadedImages.filter(img => img.isChecked);
        checkedImages = checkedImages.map(({_id}) => _id);
        let unCheckedImages = uploadedImages.filter(img => !img.isChecked);
        unCheckedImages = unCheckedImages.map(({_id}) => _id);
        let reqObj;
        switch(operation) {
            case 'reject':
                reqObj = {
                    approvedId: unCheckedImages,
                    rejectedId: checkedImages
                }
                break;
            case 'confirm':
                reqObj = {
                    approvedId: checkedImages,
                    rejectedId: unCheckedImages
                }
                break;
            default: break;
        }
        const {status} = await StatusChange(reqObj);
        if(status === 200){
            if(total - (page * limit) > 0){
                this.setState(prevState => ({
                    page: prevState.page + 1
                }), () => {
                    this.fetchImages();
                })
            }else{
                this.setState({ uploadedImages: [] });
            }
        }
    }

    render() {
        const { uploadedImages, total, page } = this.state;
        return(
            <UserDashboardContainer>
                <div className="remaining-page">Remaining Page: {Math.trunc(total / ((page * limit) - 1))}</div>
                <div className="remaining-images">Remaining Image: {total - (page * limit) > 0 ? total - (page * limit) : 0 }</div>
                {!uploadedImages.length ? <h1 className="text-center">No Image Found!</h1> :
                    <>
                        <DashboardImagesContainer>
                            {uploadedImages.map((img,i) => (
                                <div className="img-card" key={img._id}>
                                    <img src={img.image} alt={img._id} />
                                    <Checkbox
                                        type={img._id}
                                        checkBoxChange={() => this.checkBoxChange(i)} 
                                        checkboxChecked={img.isChecked} 
                                    />
                                </div>
                            ))}
                        </DashboardImagesContainer>
                        <div className="btn-wrp">
                            <CustomButton onClick={() => this.handleStatusChange('reject')} type='button'> Batch Reject </CustomButton>
                            <CustomButton onClick={() => this.handleStatusChange('confirm')} type='button'> Confirm Selection </CustomButton>
                        </div>
                    </>
                }
            </UserDashboardContainer>
        )
    }

}

export default UserDashboard;