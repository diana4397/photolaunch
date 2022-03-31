// Import Modules
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GetCookie } from '../../service/helper';

const PrivateRoute = () => {
  const redirectUrl = '/admin/login';
  const token = GetCookie('token');

  return token ? <Outlet /> : <Navigate to={redirectUrl} />;
};

export default PrivateRoute;
