import React from 'react'
import Header from '../components/layout/Headers'
import { useSelector } from 'react-redux';
import MostWantedList from '../components/specific/MostWantedList';

const User = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Header/>
      <MostWantedList />
    </div>
  );
}

export default User