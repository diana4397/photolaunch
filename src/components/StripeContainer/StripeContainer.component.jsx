import React from "react";
// import { useNavigate } from "react-router-dom";
import { CardElement } from "@stripe/react-stripe-js";
// import CustomButton from "../Custom-button/custom-button.component";
import {UserContext} from '../../contexts/userContext';
import {StripeFormContainer} from "./StripeContainer.styles";

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#fff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#fff',
      },
    },
    invalid: {
      iconColor: 'red',
      color: 'red',
    },
  },
};

const CardField = ({onChange}) => (
  <div className="form-row">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const SubmitButton = ({processing, error, children, disabled}) => (
  <button
    className={`submit-button ${error ? 'submit-error' : ''}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? 'Processing...' : children}
  </button>
);

const ErrorMessage = ({children}) => (
  <div className="error-message" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);


const DEFAULT_STATE = {
  error: null,
  cardComplete: false,
  processing: false,
  paymentMethod: null,
};

class StripeContainer extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {stripe, elements} = this.props;
    const {error, cardComplete} = this.state;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    if (error) {
      card.focus();
      return;
    }

    if (cardComplete) {
      this.setState({processing: true});
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    this.setState({processing: false});

    if (payload.error) {
      this.setState({error: payload.error});
    } else {
      this.setState({paymentMethod: payload.paymentMethod});
    }
  };

  reset = () => {
    this.setState(DEFAULT_STATE);
  };

  render() {
    const {error, processing, paymentMethod} = this.state;
    const {stripe} = this.props;
    const {thumbLength} = this.context;
    return paymentMethod ? (
      <StripeFormContainer>
        <div className="result">
          <div className="result-title" role="alert">
            Payment successful
          </div>
          <div className="result-message">
            Thanks for trying Stripe Elements. No money was charged, but we
            generated a PaymentMethod: {paymentMethod.id}
          </div>
          {/* <ResetButton onClick={this.reset} /> */}
        </div>
      </StripeFormContainer>
    ) : (
      <StripeFormContainer>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
              <CardField
                onChange={(event) => {
                  this.setState({
                    error: event.error,
                    cardComplete: event.complete,
                  });
                }}
              />
          </div>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          <SubmitButton processing={processing} error={error} disabled={!stripe}>
            {`Pay - $${10 * thumbLength}`}
          </SubmitButton>
        </form>
      </StripeFormContainer>
    );
  }
}

export default StripeContainer;