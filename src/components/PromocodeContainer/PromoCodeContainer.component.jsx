import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { PromoContainer } from './PromoCodeContainer.styles';
import CustomButton from '../CustomButton/CustomButton.component';
import { Input } from '../Input/Input.component';
import { RegisterUser } from '../../service/api';
import { UserContext } from '../../contexts/userContext';

const PromocodeContainer = ({ consentValue }) => {
    const [promoCode, setPromoCode] = useState('');
    const [payment, setPayment] = useState(false);
    const userData = useContext(UserContext);
    let navigate = useNavigate();

    const handlePromoChange = ({target: {value}}) => {
        setPromoCode(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        toast.configure();
        const {thumb, setThumb, firstName, setFirstName, lastName, setLastName, 
          address1, setAddress1, address2, setAddress2, city, setCity, state, setState, 
          zipCode, setZipCode, email, setEmail} = userData;
    
          const amount = 10 * thumb.length;
          const userDetails = JSON.parse(localStorage.getItem('userData'));
          const reqObj = {
            thumb,
            firstName: firstName || userDetails?.firstName,
            lastName: lastName || userDetails?.lastName,
            address1: address1 || userDetails?.address1,
            address2: address2 || userDetails?.address2,
            state: state || userDetails?.state,
            city: city || userDetails?.city,
            zipCode: zipCode || userDetails?.zipCode,
            email: email || userDetails?.email,
            amount,
            promoCode,
          }
          try{
            const {status} = await RegisterUser(reqObj);
            if(status === 200) {
              setPayment(true);
              toast.success("Images successfully Uploaded");
              setThumb([]);
              setTimeout(() => {
                localStorage.removeItem("userData");
                setFirstName('');
                setLastName('');
                setAddress1('');
                setAddress2('');
                setCity('');
                setState('');
                setZipCode('');
                setEmail('');
                return navigate("/launch-form")
              }, 6000);
            }
          }
          catch(e) {
            toast.error(e.response.data.errors);
          }
    }

    return(
        <PromoContainer>
          {payment ? 
              <div className="result">
                <div className="result-title" role="alert">
                  Payment successful
                </div>
              </div> :
            <form onSubmit={handleSubmit}>
                <div className="promo-text">
                    <span>Promo Code</span>
                    <Input required type='text' onChange={handlePromoChange} label='Promo Code' name='promo' value={promoCode} />
                </div>
                <CustomButton disabled={!userData.thumb.length || !consentValue}  type='submit'> Verify Promo Code </CustomButton>
            </form>
          }
        </PromoContainer>
    )
}

export default PromocodeContainer;