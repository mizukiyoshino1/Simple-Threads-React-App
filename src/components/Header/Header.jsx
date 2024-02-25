import React from 'react';
import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';

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

    // 新規登録画面へ遷移
    const goToSignUpScreen = () => {
        navigation('/signup');
    }

    return (
        <div className="header-container">
            <h1 className="header-title">Threads App</h1>
            {!isNewPostRoute && (
                <button className="new-button" type="button" onClick={goToNewPostScreen}>New Post</button>
            )}
            <button className="signup-button" type="button" onClick={goToSignUpScreen}>Sign Up</button>
        </div>
    );
}

export default Header;
