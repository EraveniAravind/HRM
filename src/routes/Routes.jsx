import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
// Role-specific features

import DoctorDashboard from '../features/doctor/DoctorDashboard';
import PatientDashboard from '../features/patient/PatientDashboard';
import SearchDoctor from '../features/patient/SearchDoctor';
import AdminDashboard from '../features/admin/AdminDashboard';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard/>} />
      <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      <Route path="/patient/dashboard" element={<PatientDashboard/>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/patient/search" element={<SearchDoctor />} />
    </Routes>
  );
};

export default AllRoutes;
