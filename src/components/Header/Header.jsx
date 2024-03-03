import React from 'react';
import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

const Header = () => {
    // location情報
    const location = useLocation();

    // 画面遷移
    const navigation = useNavigate();

    // Postボタン表示判定処理
    const isNewPostRoute = location.pathname === '/newpost';

    // 新規投稿画面へ遷移
    const goToNewPostScreen = () => {
        navigation('/newpost');
    };

    /**
     * ログアウト処理
     * 
     */
    const handleLogout = () => {
        const auth = getAuth()
        auth.signOut();
        navigation('/login');
    };

    return (
        <div className="header-container">
            <h1 className="header-title">Threads App</h1>
            {!isNewPostRoute && (
                <button className="new-button" type="button" onClick={goToNewPostScreen}>New Post</button>
            )}
            <button className="logout-button" type="button" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Header;
