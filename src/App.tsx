import Header from './layouts/Header';
import Home from './pages/Home';
import Booking from './pages/Booking';

import { AnimatePresence } from 'framer-motion';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import UnprotectedRouteStrict from './components/UnprotectedRouteStrict';
import Login from './pages/Login';
import Manage from './pages/Manage';
import ProtectedRoute from './components/ProtectedRoute';
import UserContextProvider from './contexts/UserContext';
import ManageAvailabilities from './pages/ManageAvailabilities';

export default function App() {
    return(
      <div className='main-container'>
        <Header />
        <UserContextProvider>
          <AnimatePresence mode='wait' initial={false}>
            <Routes key={location.pathname} location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/booking" element={<Booking />} />
              <Route path='/login' element={<UnprotectedRouteStrict redirect={<Login />} />} />
              <Route path='/manage' element={<ProtectedRoute redirect={<Manage />} />} />
              <Route path='/manage/availabilities' element={<ProtectedRoute redirect={<ManageAvailabilities />} />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </UserContextProvider>
      </div>
    )
}