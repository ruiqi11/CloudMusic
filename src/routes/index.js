import React from "react";
import { useRoutes, Navigate } from 'react-router-dom';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';


function Routes() {
  const routes = useRoutes([
    { 
      path: '/',
      element: <Home />,
      children: [
        { path: '/', exact: true, element: <Navigate to='/recommend'/> },
        { path: '/recommend', element: <Recommend /> },
        { path: '/rank', element: <Rank /> },
        { path: '/singers', element: <Singers /> }
      ]
    },
  ])
  return routes
}

export default Routes;
