import React, {useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeContainer from "../../components/StripeContainer/StripeContainer.component";
import PhotoUploadForm from "../UploadPhotoForm/UploadPhotoForm.screen";
import {PaymentFormContainer, BillingDetailsContainer} from './PaymentForm.styles';
import {UserContext} from '../../contexts/userContext';
import Checkbox from "../../components/Checkbox/Checkbox.component";
import PromocodeContainer from "../../components/PromocodeContainer/PromoCodeContainer.component";

const PUBLIC_KEY = 'pk_test_51KaQLBFbFIhjglaIKhPrh02O260VioC4tHo83rN5IKQHqjcTfGZgmZjbRU9ScI5a4Ix2C8QG9jK57V8vFmJcxGug00qU8womln';
const stripePromise = loadStripe(PUBLIC_KEY);

export default function PaymentForm () {
  let navigate = useNavigate();
  const userData = useContext(UserContext);
  const userDetails = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    if(!userData?.firstName && !userDetails) navigate('/launch-form');
  }, [navigate, userData, userDetails])

  const [state, setState] = useState({
    promoCheckbox: false,
    consentCheckbox: false,
  });

  const checkBoxChange = (e) => {
    const name = e.target.getAttribute('data-type');
    setState({...state, [name]: !state[name] });
  }



  return (
    <PaymentFormContainer>
      <Elements stripe={stripePromise}>
          <PhotoUploadForm />
          <BillingDetailsContainer>
            <div className="billing-details">
              <div className="lbl-billing">Your Billing Details</div>
              <p className="field-detail">First Name: <span>{userData?.firstName || userDetails?.firstName}</span></p>
              <p className="field-detail">Last Name: <span>{userData?.lastName || userDetails?.lastName}</span></p>
              <p className="field-detail">Street Address1: <span>{userData?.address1 || userDetails?.address1}</span></p>
              {(userData.address2 || userDetails?.address2) && <p className="field-detail">Street Address2: <span>{userData?.address2 || userDetails?.address2}</span></p>}
              <p className="field-detail">City: <span>{userData?.city || userDetails?.city}</span></p>
              <p className="field-detail">State: <span>{userData?.state || userDetails?.state}</span></p>
              <p className="field-detail">Zip: <span>{userData?.zipCode || userDetails?.zipCode}</span></p>
            </div>
            <div className="promo-payment-wrp">
              <Checkbox 
                checkBoxChange={checkBoxChange} 
                checkboxChecked={state.consentCheckbox} 
                type="consentCheckbox"
                label="I understand my upload will be used to create a unique work of art that will be visible to the public and used by MicroPets at their discretion"
              />
              <Checkbox checkBoxChange={checkBoxChange} checkboxChecked={state.promoCheckbox} type="promoCheckbox" label="PROMO CODE?"/>
              {!state.promoCheckbox ? <InjectedCheckoutForm /> : <PromocodeContainer />}
            </div>
        </BillingDetailsContainer>
      </Elements>
    </PaymentFormContainer>
  )
}

const InjectedCheckoutForm = () => (
  <ElementsConsumer>
    {({stripe, elements}) => (
      <StripeContainer stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
);