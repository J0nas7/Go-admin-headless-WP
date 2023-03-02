// External
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react';

// Internal
import { GuestRoute } from './core-ui/guest-route'

import Login from './Pages/Guest/Login'

import NotFound from './Pages/NotFound'

import './core-ui/global.min.css';
const domain = ''

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<GuestRoute />}>
            <Route path={domain+'/login'} element={<Login />}/>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;