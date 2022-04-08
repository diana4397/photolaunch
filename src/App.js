import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { GlobalStyle } from './global.styles';
import { LandingPage } from './screens/LandingPage/LandingPage.screen';
import PaymentForm from './screens/PaymentForm/PaymentForm.screen';
import { Login } from './screens/Login/Login.screen';
import { AdminDashboard } from './screens/AdminDashboard/AdminDashboard.screen';
import { PartneredSchool } from './screens/PartneredSchool/PartneredSchool.screen';
import SuccessPage from './screens/SuccessPage/SuccessPage.screen';
import { UserProvider } from './contexts/userContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.component';
import './App.css';

const LaunchForm = lazy(() =>
    import ('./screens/LaunchForm/LaunchForm.screen'));

function App() {
    return ( <
        UserProvider >
        <
        GlobalStyle / >
        <
        Suspense fallback = { < GridLoader / > } >
        <
        Routes >
        <
        Route exact path = '/'
        element = { < LandingPage / > }
        /> <
        Route exact path = '/launch-form'
        element = { < LaunchForm / > }
        /> <
        Route exact path = '/payment-form'
        element = { < PaymentForm / > }
        /> <
        Route exact path = '/success-page'
        element = { < SuccessPage / > }
        /> <
        Route exact path = '/admin/login'
        element = { < Login / > }
        />  <
        Route exact path = '/dashboard'
        element = { < PrivateRoute / > } >
        <
        Route exact path = '/dashboard'
        element = { < AdminDashboard / > }
        /> < /
        Route > <
        Route exact path = '/school-onboard'
        element = { < PrivateRoute / > } >
        <
        Route exact path = '/school-onboard'
        element = { < AdminDashboard / > }
        /> < /
        Route > <
        Route exact path = '/partnered-school'
        element = { < PartneredSchool / > }
        />   < /
        Routes > <
        /Suspense> < /
        UserProvider >
    );
}

export default App;