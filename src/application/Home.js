import React from 'react';
import { Outlet } from 'react-router';

function Home() {
  return (
      <div>
        Home
        <Outlet />
      </div>
  )
}

export default React.memo(Home);
