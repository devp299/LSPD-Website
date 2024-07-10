import { lazy,React, Suspense } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute';
import UserCareer from './pages/UserCareer';
import User from './pages/User';
import Careers from './components/specific/Careers';
const Home = lazy(() => import("./pages/Home"));
const LoginSignup = lazy(() => import("./pages/LoginSignup"));

let user = true;

const App = () => {
  return (
    <BrowserRouter> 
        <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path='/' element={<Home />} />
            <Route path='/user' element={<User />} />
            <Route path='/user/career' element={<Careers />} />
          </Route>
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        </Suspense>
    </BrowserRouter>
  )
}

export default App
