import { lazy, React, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from './utils/axiosInstance';
import ProtectRoute from './components/auth/ProtectRoute';
import { adminExists, adminNotExists, userExists, userNotExists } from './redux/auth';
import User from './pages/User';
import Careers from './pages/Careers';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNews from './pages/admin/AdminNews';
import AdminCareers from './pages/admin/AdminCareers';
import AdminWantedList from './pages/admin/AdminWantedList';
import AllAnnouncements from './pages/admin/AllAnnouncements';
import NewsAnnouncements from './components/specific/NewsAnnouncements';
import axios from 'axios';
import ParallaxSection from './pages/ParallaxSection';
import ProtectAdmin from './components/auth/ProtectAdmin';

const LoginSignup = lazy(() => import("./pages/LoginSignup"));
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.auth.user);
  const admin = useSelector(state => state.auth.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data } = await axiosInstance.get('http://localhost:3000/api/v1/admin', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`
          },
          withCredentials: true  
        });
        dispatch(adminExists(data.admin));
      } catch (error) {
        dispatch(adminNotExists());
      } finally {
        setLoading(false);
      }
    };

    const checkAuth = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/v1/user/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`
          },
          withCredentials: true
        });
        dispatch(userExists(data.user));
      } catch (error) {
        dispatch(userNotExists());
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    checkAdmin();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<ProtectAdmin admin={admin} />}>
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/admin/career' element={<AdminCareers />} />
            <Route path='/admin/list' element={<AdminWantedList />} />
            <Route path='/admin/news' element={<AdminNews />} />
            <Route path='/admin/all-announcements' element={<AllAnnouncements />} />
          </Route>
          <Route element={<ProtectRoute user={user} />}>
            <Route path='/user' element={<User />} />
            <Route path='/user/announcements' element={<NewsAnnouncements />} />
            <Route path='/user/career' element={<Careers />} />
          </Route>
          <Route path='/login' element={user ? <Navigate to="/user" /> : <LoginSignup />} />
          <Route path='/' element={user ? <Navigate to="/user" /> : <ParallaxSection />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App;
