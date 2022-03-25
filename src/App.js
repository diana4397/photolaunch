import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { GlobalStyle } from './global.styles';
import { LandingPage } from './screens/LandingPage/LandingPage.screen';
import PaymentForm from './screens/PaymentForm/PaymentForm.screen';
import { Login } from './screens/Login/Login.screen';
import { AdminDashboard } from './screens/AdminDashboard/AdminDashboard.screen';
import { PartneredSchool } from './screens/PartneredSchool/PartneredSchool.screen';
import { UserProvider } from './contexts/userContext';
import './App.css';

const LaunchForm = lazy(() =>
    import ('./screens/LaunchForm/LaunchForm.screen'));

function App() {
    return ( <
        UserProvider >
        <
        div >
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
        />  <
        Route exact path = '/admin/login'
        element = { < Login / > }
        />  <
        Route exact path = '/dashboard'
        element = { < AdminDashboard / > }
        />   <
        Route exact path = '/school-onboard'
        element = { < AdminDashboard / > }
        />   <
        Route exact path = '/partnered-school'
        element = { < PartneredSchool / > }
        />   < /
        Routes > <
        /Suspense> < /
        div >
        <
        /UserProvider>
    );
}

export default App;