import React from 'react';
import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    // location情報
    const location = useLocation();

    // 画面遷移
    const navigation = useNavigate();

    // Postボタン表示判定処理
    const isNewPostRoute = location.pathname === '/new';

    // 新規投稿画面へ遷移
    const goToNewPostScreen = () => {
        navigation('/new');
    };

    return (
        <div className="header-container">
            <h1 className="header-title">Threads App</h1>
            {!isNewPostRoute && (
                <button className="new-button" type="button" onClick={goToNewPostScreen}>New Post</button>
            )}
        </div>
    );
}

export default Header;
