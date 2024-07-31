import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const ProtectRoute = ({ user }) => {
  if (!user) {
    return <Navigate to={"/"} />;
  }
  
  return <Outlet />;
};

export default ProtectRoute;
