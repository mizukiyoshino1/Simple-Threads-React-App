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
                <button className="new-button" type="button" onClick={goToNewPostScreen}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
            )}
            <button className="logout-button" type="button" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Header;
