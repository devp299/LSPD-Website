import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const ProtectRoute = ({ user, isAdmin }) => {
  if (!user) {
    if(!isAdmin){
      return <Navigate to="/login"/>
    }
    return <Navigate to="/" />;
  }
  
  return <Outlet />;
};

export default ProtectRoute;
