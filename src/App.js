import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainContents from './components/MainContents/MainContents';
import NewPost from './components/NewPost/NewPost';
import SignUp from './components/Auth/SignUp/SignUp';
import Login from './components/Auth/Login/Login';
import { useAuthContext } from './context/AuthContext';

function App() {
  // ログイン情報
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/' element={user ? <MainContents /> : <Navigate to="/login" />} />
      <Route path='/newpost' element={user ? <NewPost /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
