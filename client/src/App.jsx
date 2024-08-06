import { lazy, React, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectRoute from './components/auth/ProtectRoute';
import ProtectAdmin from './components/auth/ProtectAdmin';
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
import './css/loader.css'; // Make sure to include your loader's CSS
import { LayoutLoader } from './components/layout/Loaders';
import Transition from './hooks/Transition';
import MostWantedList from './components/specific/MostWantedList';
import UserNews from './components/specific/UserNews';
import UserAllNews from './components/specific/UserAllNews';
import { server } from './constants/config';
import Demo from './components/Demo';

const LoginSignup = lazy(() => import("./pages/LoginSignup"));
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  const [showTransition, setShowTransition] = useState(true);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.auth.user);
  const admin = useSelector(state => state.auth.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data } = await axios.get(`${server}/api/v1/admin`, {
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
        const { data } = await axios.get(`${server}/api/v1/user/me`, {
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

  if (loading) return <LayoutLoader/>;

  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>}>
        {/* <Loader/> */}
        <Routes>
          <Route element={<ProtectAdmin admin={admin} />}>
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/admin/career' element={<AdminCareers />} />
            <Route path='/admin/list' element={<AdminWantedList />} />
            <Route path='/admin/news' element={<AdminNews />} />
            <Route path='/admin/all-announcements' element={<AllAnnouncements />} />
          </Route>
          <Route element={<ProtectRoute user={user} />}>
            {/* <Route path='/user/face' element={<Demo />} /> */}
            <Route path='/user' element={<User />} />
            <Route path='/user/announcements' element={<UserNews />} />
            <Route path='/user/all-announcements' element={<UserAllNews />} />
            <Route path='/user/career' element={<Careers />} />
          </Route>
          <Route path='/login' element={user ? <Navigate to="/user" /> : <LoginSignup />} />
          <Route path='/' element={user ? <Navigate to="/user" /> : <ParallaxSection />} />
          <Route path='/list' element={user ? <Navigate to="/user" /> : <MostWantedList />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
