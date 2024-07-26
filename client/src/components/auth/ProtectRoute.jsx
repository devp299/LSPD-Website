import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const ProtectRoute = ({ user,isAdmin }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  if(!isAdmin) {
    return <Navigate to="/"/>;
  }

  return <Outlet />;
};

export default ProtectRoute;
