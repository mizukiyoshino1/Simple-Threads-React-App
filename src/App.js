import React, { useEffect, useState} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainContents from './components/MainContents/MainContents';
import NewPost from './components/NewPost/NewPost';
import SignUp from './components/Auth/SignUp/SignUp';
import Login from './components/Auth/Login/Login';
import Profile from './components/Profile/Profile';
import LikeNotification from './components/LikeNotification/LikeNotification';
import Search from './components/Search/Search';
import { useAuthContext } from './context/AuthContext';

function App() {
  // ログイン情報
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/' element={user ? <MainContents /> : <Navigate to="/login" />} />
      <Route path='/likes' element={user ? <LikeNotification /> : <Navigate to="/profile" />} />
      <Route path='/newpost' element={user ? <NewPost /> : <Navigate to="/login" />} />
      <Route path='/search' element={user ? <Search /> : <Navigate to="/profile" />} />
      <Route path='/profile' element={user ? <Profile /> : <Navigate to="/profile" />} />
    </Routes>
  );
}

export default App;
