import { lazy,React, Suspense } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute';
import User from './pages/User';
import Careers from './pages/Careers';
import Admin from './pages/admin/Admin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNews from './pages/admin/AdminNews';
import AdminCareers from './pages/admin/AdminCareers';
import AdminWantedList from './pages/admin/AdminWantedList';
import AllAnnouncements from './pages/admin/AllAnnouncements';
const LoginSignup = lazy(() => import("./pages/LoginSignup"));

const Home = lazy(() => import("./pages/Home"));

let user = true;

const App = () => {
  return (
    <BrowserRouter> 
        <Suspense fallback={<div>Loading</div>}>
        <Routes>
            {/* <Route path='/admin' element={<Admin />} /> */}
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/admin/career' element={<AdminCareers />} />
            <Route path='/admin/list' element={<AdminWantedList />} />
            <Route path='/admin/news' element={<AdminNews />} />
            <Route path='/admin/all-announcements' element={<AllAnnouncements />}/>
          <Route element={<ProtectRoute user={user} />}>
            <Route path='/user' element={<User />} />
            <Route path='/user/career' element={<Careers />} />
          </Route>
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/' element={<Home />} />
        </Routes>
        </Suspense>
    </BrowserRouter>
  )
}

export default App
