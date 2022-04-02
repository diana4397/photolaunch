import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle `
	body {
		font-family: 'Open Sans Condensed';
		color: #ffffff;
	}
	a {
		text-decoration: none;
		color: black;
	}
	*, *::before, *::after {
        box-sizing: border-box;
	}
	.StripeElement--webkit-autofill {
		background: transparent !important;
	}
	
	.StripeElement {
		width: 100%;
		padding: 11px 15px 11px 0;
	}
	.btn-back {
		width: 165px;
		margin-bottom: 20px;
		background-color: #fff;
	}
	.text-center {
		text-align: center;
	}
`;