import { Navigate, Outlet } from 'react-router-dom';

const ProtectAdmin = ({ admin }) => {
  if(!admin) 
    return <Navigate to="/" />;

  return <Outlet />;
};

export default ProtectAdmin;
