import React from 'react'
import Header from '../components/layout/Headers'
import { useSelector } from 'react-redux';
import MostWantedList from '../components/specific/MostWantedList';
import UserLayout from '../components/layout/UserLayout';
import { Toaster } from 'react-hot-toast';
const User = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <UserLayout>
      {/* <Header/> */}
      <MostWantedList />
      </UserLayout>
      <Toaster/>
    </div>
  );
}

export default User