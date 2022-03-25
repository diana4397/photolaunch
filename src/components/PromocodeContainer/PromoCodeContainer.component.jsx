import React, { useState } from "react";
import { PromoContainer } from './PromoCodeContainer.styles';
import CustomButton from '../CustomButton/CustomButton.component';
import { Input } from '../Input/Input.component';

const PromocodeContainer = () => {
    const [promoCode, setPromoCode] = useState('');

    const handlePromoChange = ({target: {value}}) => {
        setPromoCode(value);
    };

    return(
        <PromoContainer>
            <div className="promo-text">
                <span>Promo Code</span>
                <Input required type='text' onChange={handlePromoChange} label='Promo Code' name='promo' value={promoCode} />
            </div>
            <CustomButton  type='button'> Verify Promo Code </CustomButton>
        </PromoContainer>
    )
}

export default PromocodeContainer;