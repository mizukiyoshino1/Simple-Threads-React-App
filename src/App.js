import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import MainContents from './components/MainContents';
import NewPost from './components/NewPost';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<MainContents />} />
        <Route path='/new' element={<NewPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
