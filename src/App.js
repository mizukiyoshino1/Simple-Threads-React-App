import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import MainContents from './components/MainContents/MainContents';
import NewPost from './components/NewPost/NewPost';
import UserAccess from './components/UserAccess/UserAccess';

function App() {
  // ログイン情報
  const [isLogin, setIsLogin] = useState(false);

  // ログイン状態を管理
  const handleLogin = (loginStatus) => {
    setIsLogin(loginStatus);
  };

  return (
    <BrowserRouter>
      {isLogin && <Header/>}
      <Routes>
        <Route path='/' element={isLogin ? <MainContents /> : <Navigate to="/login"/>} />
        <Route path='/newpost' element={isLogin ? <NewPost /> : <Navigate to="/login"/>} />
        <Route path='/login' element={<UserAccess onLogin={handleLogin} />}/>
        <Route path='/signup' element={<UserAccess onLogin={handleLogin} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
