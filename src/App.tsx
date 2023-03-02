// External
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react';

// Internal
import { PrivateRoute } from './core-ui/private-route'
import { GuestRoute } from './core-ui/guest-route'

// Admin pages
import Overview from './Pages/Overview'
//import MySettings from './Pages/MySettings'

// Guest pages
import Login from './Pages/Guest/Login'

// Global pages
import NotFound from './Pages/NotFound'

import './core-ui/global.min.css';
const domain = ''

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
            <Route path={domain+'/'} element={<Overview />}/>
        </Route>

        <Route element={<GuestRoute />}>
            <Route path={domain+'/login'} element={<Login />}/>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;