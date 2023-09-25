import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';

import StaffLogin from './pages/StaffLogin';
import UserDashboard from './pages/UserDashboard';
import StaffDashboard from './pages/StaffDashboard';
import UserDetails from './components/UserDetails';
import ProfileEdit from './pages/ProfileEdit';
import RegistrationForm from './components/RegistrationForm'; // Add this line
import CarWashList from './pages/CarWashList';
import RegisterCarWash from './pages/RegisterCarWash';
import Home from './pages/Home';


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          {/* <Header /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/carwashes' element={<CarWashList />} />
            <Route path='/login/:carWashId' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/staff/login/:carWashId' element={<StaffLogin />} />
            <Route path='/user/dashboard/:userId/:carWashId' element={<UserDashboard />} />
            <Route path='/staff/dashboard/' element={<StaffDashboard />} />
            <Route path='/staff/dashboard/:carWashId' element={<StaffDashboard />} />
            <Route path='/users/:id' element={<UserDetails />} />
            <Route path='/users/:id/:carWashId' element={<UserDetails />} />
            <Route path='/profile' element={<ProfileEdit />} />
            <Route path='/register-customer/:carWashId' element={<RegistrationForm />} /> 
            <Route path='/:carWashId/dashboard' element={<Dashboard />} />
            <Route path='/register-carwash' element={<RegisterCarWash />} />

          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

